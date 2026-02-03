import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Column } from './Column';
import { TaskModal } from './TaskModal';
import { FilterBar } from './FilterBar';
import { Task, Filters, KanbanData, ColumnId } from '../types';
import { getInitialData } from '../utils/initialData';
import { saveToStorage, loadFromStorage, exportToJSON, exportToMarkdown, importFromJSON } from '../utils/storage';
import { FiPlus, FiFilm } from 'react-icons/fi';

export const KanbanBoard: React.FC = () => {
  const [data, setData] = useState<KanbanData>(() => {
    const saved = loadFromStorage();
    return saved || getInitialData();
  });

  const [filters, setFilters] = useState<Filters>({
    priority: 'all',
    category: 'all',
    assignee: 'all',
    search: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [modalInitialColumn, setModalInitialColumn] = useState<ColumnId>('backlog');

  // Auto-save to localStorage on data change
  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + N: New task
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        setEditingTask(undefined);
        setModalInitialColumn('backlog');
        setIsModalOpen(true);
      }
      // Esc: Close modal
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isModalOpen]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const sourceColumn = data.columns.find(col => col.id === source.droppableId);
    const destColumn = data.columns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    const task = sourceColumn.tasks.find(t => t.id === draggableId);
    if (!task) return;

    // Create new columns array with updated tasks
    const newColumns = data.columns.map(column => {
      if (column.id === source.droppableId) {
        // Remove from source
        return {
          ...column,
          tasks: column.tasks.filter(t => t.id !== draggableId),
        };
      }
      if (column.id === destination.droppableId) {
        // Add to destination
        const newTasks = Array.from(column.tasks);
        const updatedTask = { ...task, columnId: destination.droppableId as ColumnId };
        newTasks.splice(destination.index, 0, updatedTask);
        return {
          ...column,
          tasks: newTasks,
        };
      }
      return column;
    });

    setData({
      columns: newColumns,
      lastUpdated: new Date().toISOString(),
    });
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      // Update existing task
      const newColumns = data.columns.map(column => ({
        ...column,
        tasks: column.tasks.map(task =>
          task.id === editingTask.id ? { ...task, ...taskData } as Task : task
        ),
      }));

      // Move task to new column if changed
      if (taskData.columnId && taskData.columnId !== editingTask.columnId) {
        const movedColumns = newColumns.map(column => {
          if (column.id === editingTask.columnId) {
            return {
              ...column,
              tasks: column.tasks.filter(t => t.id !== editingTask.id),
            };
          }
          if (column.id === taskData.columnId) {
            const updatedTask = { ...editingTask, ...taskData } as Task;
            return {
              ...column,
              tasks: [...column.tasks, updatedTask],
            };
          }
          return column;
        });

        setData({
          columns: movedColumns,
          lastUpdated: new Date().toISOString(),
        });
      } else {
        setData({
          columns: newColumns,
          lastUpdated: new Date().toISOString(),
        });
      }
    } else {
      // Add new task
      const newTask = taskData as Task;
      const newColumns = data.columns.map(column =>
        column.id === newTask.columnId
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      );

      setData({
        columns: newColumns,
        lastUpdated: new Date().toISOString(),
      });
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      const newColumns = data.columns.map(column => ({
        ...column,
        tasks: column.tasks.filter(task => task.id !== taskId),
      }));

      setData({
        columns: newColumns,
        lastUpdated: new Date().toISOString(),
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleArchiveCompleted = () => {
    const doneColumn = data.columns.find(col => col.id === 'done');
    if (!doneColumn || doneColumn.tasks.length === 0) {
      alert('No completed tasks to archive');
      return;
    }

    if (confirm(`Archive ${doneColumn.tasks.length} completed tasks?`)) {
      const newColumns = data.columns.map(column =>
        column.id === 'done' ? { ...column, tasks: [] } : column
      );

      setData({
        columns: newColumns,
        lastUpdated: new Date().toISOString(),
      });
    }
  };

  const handleImport = async (file: File) => {
    try {
      const importedData = await importFromJSON(file);
      setData(importedData);
      alert('Data imported successfully!');
    } catch (error) {
      alert('Failed to import data. Please check the file format.');
    }
  };

  const filterTasks = useCallback((tasks: Task[]) => {
    return tasks.filter(task => {
      if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
      if (filters.category !== 'all' && task.category !== filters.category) return false;
      if (filters.assignee !== 'all' && task.assignee !== filters.assignee) return false;
      if (filters.search) {
        const search = filters.search.toLowerCase();
        return (
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
        );
      }
      return true;
    });
  }, [filters]);

  const filteredData = {
    ...data,
    columns: data.columns.map(column => ({
      ...column,
      tasks: filterTasks(column.tasks),
    })),
  };

  return (
    <div className="min-h-screen bg-dark-500">
      {/* Header */}
      <div className="bg-dark-300 border-b border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiFilm size={32} className="text-primary-500" />
              <div>
                <h1 className="text-2xl font-bold text-white">ReelSmith Kanban</h1>
                <p className="text-sm text-gray-400">Task Management for Film Production</p>
              </div>
            </div>
            <button
              onClick={() => {
                setEditingTask(undefined);
                setModalInitialColumn('backlog');
                setIsModalOpen(true);
              }}
              className="btn-primary flex items-center gap-2"
            >
              <FiPlus size={18} />
              New Task
              <span className="text-xs opacity-70">(Ctrl+N)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Filters */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          onExportJSON={() => exportToJSON(data)}
          onExportMarkdown={() => exportToMarkdown(data)}
          onImport={handleImport}
          onArchiveCompleted={handleArchiveCompleted}
        />

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-6">
            {filteredData.columns.map(column => (
              <Column
                key={column.id}
                column={column}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(undefined);
        }}
        onSave={handleSaveTask}
        task={editingTask}
        initialColumnId={modalInitialColumn}
      />
    </div>
  );
};
