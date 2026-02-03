import React, { useState, useEffect } from 'react';
import { Task, Priority, Category, Assignee, ColumnId } from '../types';
import { FiX } from 'react-icons/fi';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  task?: Task;
  initialColumnId?: ColumnId;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  task,
  initialColumnId,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as Priority,
    category: 'Product' as Category,
    assignee: 'Arun' as Assignee,
    dueDate: '',
    columnId: initialColumnId || 'backlog' as ColumnId,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        category: task.category,
        assignee: task.assignee,
        dueDate: task.dueDate || '',
        columnId: task.columnId,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        category: 'Product',
        assignee: 'Arun',
        dueDate: '',
        columnId: initialColumnId || 'backlog',
      });
    }
  }, [task, initialColumnId, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const taskData: Partial<Task> = {
      ...formData,
      dueDate: formData.dueDate || undefined,
    };

    if (task) {
      taskData.id = task.id;
      taskData.createdAt = task.createdAt;
    } else {
      taskData.id = `task-${Date.now()}`;
      taskData.createdAt = new Date().toISOString();
    }

    onSave(taskData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-dark-300 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-800">
        <div className="sticky top-0 bg-dark-300 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {task ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input w-full"
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input w-full min-h-[100px] resize-y"
              placeholder="Enter task description (Markdown supported)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                className="select w-full"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                className="select w-full"
              >
                <option value="Marketing">Marketing</option>
                <option value="Product">Product</option>
                <option value="Research">Research</option>
                <option value="Automation">Automation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Assignee
              </label>
              <select
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value as Assignee })}
                className="select w-full"
              >
                <option value="Arun">Arun</option>
                <option value="Arc">Arc</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="input w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Column
            </label>
            <select
              value={formData.columnId}
              onChange={(e) => setFormData({ ...formData, columnId: e.target.value as ColumnId })}
              className="select w-full"
            >
              <option value="backlog">📋 Backlog</option>
              <option value="in-progress">🔄 In Progress</option>
              <option value="done">✅ Done</option>
              <option value="blocked">⏸️ Blocked/Waiting</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
