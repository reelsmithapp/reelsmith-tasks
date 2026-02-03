import { useState, useMemo } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { Column } from './components/Column';
import { TaskModal } from './components/TaskModal';
import { useKanban } from './hooks/useKanban';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Task, TaskStatus, TASK_STATUS_CONFIG } from './types';
import { groupTasksByStatus } from './utils/filters';

function App() {
  const {
    tasks,
    filteredTasks,
    filter,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    archiveCompletedTasks,
    updateFilter,
    clearFilters,
    importTasks,
  } = useKanban();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  // Group filtered tasks by status
  const tasksByStatus = useMemo(
    () => groupTasksByStatus(filteredTasks),
    [filteredTasks]
  );

  // Handle drag and drop
  const handleDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;

    if (!destination) return;

    const newStatus = destination.droppableId as TaskStatus;
    moveTask(draggableId, newStatus);
  };

  // Open modal for new task
  const handleAddTask = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  // Open modal for editing task
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Save task (create or update)
  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
  };

  // Delete task with confirmation
  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  // Archive completed tasks with confirmation
  const handleArchive = () => {
    const completedCount = tasks.filter((t) => t.status === 'done' && !t.archived).length;
    if (completedCount === 0) {
      alert('No completed tasks to archive.');
      return;
    }
    if (window.confirm(`Archive ${completedCount} completed task(s)?`)) {
      archiveCompletedTasks();
    }
  };

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'n',
      action: handleAddTask,
    },
    {
      key: 'a',
      action: handleArchive,
    },
    {
      key: '/',
      action: () => {
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      },
    },
  ]);

  const columnOrder: TaskStatus[] = ['backlog', 'in-progress', 'done', 'blocked'];

  return (
    <div className="min-h-screen bg-reel-dark">
      <Header
        onAddTask={handleAddTask}
        onArchiveCompleted={handleArchive}
        onImport={importTasks}
        tasks={tasks}
      />

      <main className="max-w-[1800px] mx-auto px-6 py-6">
        <FilterBar
          filter={filter}
          onFilterChange={updateFilter}
          onClearFilters={clearFilters}
        />

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {columnOrder.map((status) => (
              <Column
                key={status}
                status={status}
                tasks={tasksByStatus[status] || []}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          </div>
        </DragDropContext>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-medium mb-2">No tasks found</h3>
            <p className="text-sm mb-4">
              {tasks.length === 0
                ? 'Create your first task to get started!'
                : 'Try adjusting your filters or search query.'}
            </p>
            {tasks.length === 0 && (
              <button
                onClick={handleAddTask}
                className="bg-reel-blue-light hover:bg-reel-blue-bright text-white font-medium px-6 py-2 rounded-lg transition-colors"
              >
                Create First Task
              </button>
            )}
          </div>
        )}

        {/* Task Stats */}
        {tasks.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {columnOrder.map((status) => {
              const count = tasks.filter((t) => t.status === status && !t.archived).length;
              const config = TASK_STATUS_CONFIG[status];
              return (
                <div key={status} className="bg-reel-gray rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{config.icon}</span>
                    <span className="text-gray-400 text-sm">{config.title}</span>
                  </div>
                  <div className="text-3xl font-bold text-white">{count}</div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        initialTask={editingTask}
      />

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-4 right-4 bg-reel-gray-light rounded-lg p-3 shadow-lg border border-reel-gray text-xs text-gray-400">
        <div className="font-medium text-white mb-2">Keyboard Shortcuts</div>
        <div className="space-y-1">
          <div><kbd className="bg-reel-gray px-2 py-1 rounded">N</kbd> New task</div>
          <div><kbd className="bg-reel-gray px-2 py-1 rounded">A</kbd> Archive completed</div>
          <div><kbd className="bg-reel-gray px-2 py-1 rounded">/</kbd> Search</div>
        </div>
      </div>
    </div>
  );
}

export default App;
