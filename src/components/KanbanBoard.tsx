import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Column } from './Column';
import { TaskModal } from './TaskModal';
import { FilterBar } from './FilterBar';
import { Task, Filters, KanbanData, ColumnId } from '../types';
import { getInitialData } from '../utils/initialData';
import { api, saveOffline, loadOffline } from '../services/api';
import { FiPlus, FiWifiOff, FiRefreshCw, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const KanbanBoard: React.FC = () => {
  const { username, logout } = useAuth();
  const [data, setData] = useState<KanbanData>(getInitialData);
  const [filters, setFilters] = useState<Filters>({
    priority: 'all',
    category: 'all',
    assignee: 'all',
    search: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [modalInitialColumn, setModalInitialColumn] = useState<ColumnId>('backlog');
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks from API on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getTasks();

      if (response.success && response.data) {
        const tasks = response.data;

        // Organize tasks into columns
        const columns = [
          {
            id: 'backlog' as ColumnId,
            title: 'Backlog',
            icon: '📋',
            tasks: tasks.filter(t => t.status === 'backlog'),
          },
          {
            id: 'in-progress' as ColumnId,
            title: 'In Progress',
            icon: '🔄',
            tasks: tasks.filter(t => t.status === 'in-progress'),
          },
          {
            id: 'done' as ColumnId,
            title: 'Done',
            icon: '✅',
            tasks: tasks.filter(t => t.status === 'done'),
          },
          {
            id: 'blocked' as ColumnId,
            title: 'Blocked/Waiting',
            icon: '⏸️',
            tasks: tasks.filter(t => t.status === 'blocked'),
          },
        ];

        setData({
          columns,
          lastUpdated: new Date().toISOString(),
        });

        // Save to offline storage as backup
        saveOffline(tasks);
        setIsOnline(true);
      }
    } catch (err) {
      console.error('Failed to load tasks from API:', err);
      setError('Failed to connect to server. Loading offline data...');
      setIsOnline(false);

      // Fallback to offline data
      const offlineTasks = loadOffline();
      if (offlineTasks && offlineTasks.length > 0) {
        const columns = [
          {
            id: 'backlog' as ColumnId,
            title: 'Backlog',
            icon: '📋',
            tasks: offlineTasks.filter(t => t.status === 'backlog'),
          },
          {
            id: 'in-progress' as ColumnId,
            title: 'In Progress',
            icon: '🔄',
            tasks: offlineTasks.filter(t => t.status === 'in-progress'),
          },
          {
            id: 'done' as ColumnId,
            title: 'Done',
            icon: '✅',
            tasks: offlineTasks.filter(t => t.status === 'done'),
          },
          {
            id: 'blocked' as ColumnId,
            title: 'Blocked/Waiting',
            icon: '⏸️',
            tasks: offlineTasks.filter(t => t.status === 'blocked'),
          },
        ];

        setData({
          columns,
          lastUpdated: new Date().toISOString(),
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleDragEnd = async (result: DropResult) => {
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

    // Optimistic update
    const newColumns = data.columns.map(column => {
      if (column.id === source.droppableId) {
        return {
          ...column,
          tasks: column.tasks.filter(t => t.id !== draggableId),
        };
      }
      if (column.id === destination.droppableId) {
        const newTasks = Array.from(column.tasks);
        const updatedTask = { ...task, status: destination.droppableId as Task['status'] };
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

    // Update on server
    try {
      await api.moveTask(draggableId, destination.droppableId as Task['status']);
    } catch (err) {
      console.error('Failed to update task on server:', err);
      setError('Failed to save changes. Working offline.');
      // Revert on error - reload from server or offline
      loadTasks();
    }
  };

  const handleSaveTask = async (taskData: Partial<Task>) => {
    try {
      if (editingTask) {
        // Update existing task
        const response = await api.updateTask(editingTask.id, taskData);

        if (response.success && response.data) {
          // Reload tasks to get fresh data
          await loadTasks();
          setIsModalOpen(false);
          setEditingTask(undefined);
        }
      } else {
        // Create new task
        const newTaskData = {
          ...taskData,
          status: taskData.status || 'backlog',
          createdAt: new Date().toISOString(),
        } as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

        const response = await api.createTask(newTaskData);

        if (response.success && response.data) {
          // Reload tasks to get fresh data
          await loadTasks();
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Failed to save task:', err);
      setError('Failed to save task. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await api.deleteTask(taskId);

        // Optimistic update
        const newColumns = data.columns.map(column => ({
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId),
        }));

        setData({
          columns: newColumns,
          lastUpdated: new Date().toISOString(),
        });
      } catch (err) {
        console.error('Failed to delete task:', err);
        setError('Failed to delete task. Please try again.');
        loadTasks(); // Reload to restore state
      }
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

  const handleExportJSON = async () => {
    try {
      await api.exportJSON();
    } catch (err) {
      console.error('Failed to export JSON:', err);
      setError('Failed to export. Please try again.');
    }
  };

  const handleExportMarkdown = async () => {
    try {
      await api.exportMarkdown();
    } catch (err) {
      console.error('Failed to export Markdown:', err);
      setError('Failed to export. Please try again.');
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
    <div className="min-h-screen bg-obsidian">
      {/* Header */}
      <div className="bg-obsidian-elevated border-b border-frost-5 sticky top-0 z-40">
        <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src="/icon.png"
                alt="ReelSmith"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex-shrink-0"
              />
              <div className="min-w-0">
                {!isOnline && (
                  <p className="text-xs text-inferno-400 sm:hidden flex items-center gap-1">
                    <FiWifiOff size={12} /> Offline
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!isOnline && (
                <Button
                  variant="secondary"
                  onClick={loadTasks}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <FiRefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                  Retry Connection
                </Button>
              )}
              <Button
                variant="gradient"
                onClick={() => {
                  setEditingTask(undefined);
                  setModalInitialColumn('backlog');
                  setIsModalOpen(true);
                }}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <FiPlus size={18} />
                <span className="hidden sm:inline">New Task</span>
                <kbd className="hidden sm:inline ml-1 text-xs opacity-70 bg-obsidian/30 px-1.5 py-0.5 rounded">Ctrl+N</kbd>
              </Button>
              <div className="flex items-center gap-2 pl-3 border-l border-frost-10">
                <span className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
                  <FiUser size={14} />
                  {username}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  title="Sign out"
                  className="text-muted-foreground hover:text-white"
                >
                  <FiLogOut size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <Card variant="default" className="mx-6 mt-4 bg-inferno-900/30 border-inferno-700">
          <div className="p-3 flex items-center justify-between">
            <p className="text-sm text-inferno-300">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setError(null)}
              className="text-inferno-400 hover:text-inferno-300"
            >
              Dismiss
            </Button>
          </div>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-brand animate-pulse mx-auto mb-4 flex items-center justify-center">
              <FiRefreshCw size={24} className="animate-spin text-obsidian" />
            </div>
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-6">
          {/* Filters */}
          <FilterBar
            filter={filters}
            onFilterChange={(key, value) => {
              setFilters(prev => ({ ...prev, [key]: value }));
            }}
            onClearFilters={() => {
              setFilters({
                priority: 'all',
                category: 'all',
                assignee: 'all',
                search: '',
              });
            }}
          />

          {/* Action Buttons - Scrollable on mobile */}
          <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 sm:overflow-visible">
            <Button
              variant="secondary"
              onClick={handleExportJSON}
              disabled={isLoading}
              size="sm"
              className="flex-shrink-0"
            >
              Export JSON
            </Button>
            <Button
              variant="secondary"
              onClick={handleExportMarkdown}
              disabled={isLoading}
              size="sm"
              className="flex-shrink-0"
            >
              Export Markdown
            </Button>
            <Button
              variant="secondary"
              onClick={handleArchiveCompleted}
              disabled={isLoading}
              size="sm"
              className="flex-shrink-0"
            >
              Archive Completed
            </Button>
          </div>

          {/* Kanban Board - Touch-friendly scrolling */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-6 -mx-3 px-3 sm:mx-0 sm:px-0 snap-x snap-mandatory touch-pan-x">
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
      )}

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
