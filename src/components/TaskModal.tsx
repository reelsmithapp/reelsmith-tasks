import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { Task, TaskStatus, TaskPriority, TaskCategory, Assignee } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Partial<Task>) => void | Promise<void>;
  task?: Task;
  initialColumnId?: TaskStatus;
}

// Backwards compatibility
type TaskModalPropsLegacy = TaskModalProps & {
  initialTask?: Task;
}

export const TaskModal: React.FC<TaskModalPropsLegacy> = ({ isOpen, onClose, onSave, task, initialTask, initialColumnId }) => {
  const editingTask = task || initialTask;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('backlog');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [category, setCategory] = useState<TaskCategory>('product');
  const [assignee, setAssignee] = useState<Assignee>('Arun');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setPriority(editingTask.priority);
      setCategory(editingTask.category);
      setAssignee(editingTask.assignee);
      setDueDate(editingTask.dueDate ? editingTask.dueDate.split('T')[0] : '');
    } else {
      // Reset form
      setTitle('');
      setDescription('');
      setStatus(initialColumnId || 'backlog');
      setPriority('medium');
      setCategory('product');
      setAssignee('Arun');
      setDueDate('');
    }
  }, [editingTask, initialColumnId, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      category,
      assignee,
      dueDate: dueDate || undefined,
      updatedAt: new Date().toISOString(),
      archived: editingTask?.archived,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-reel-gray-light rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-reel-gray">
          <h2 className="text-2xl font-semibold text-white">
            {editingTask ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-reel-gray rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-reel-gray border border-reel-gray-light rounded-lg px-4 py-2 text-white focus:outline-none focus:border-reel-blue-light transition-colors"
              placeholder="Enter task title..."
              required
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-reel-gray border border-reel-gray-light rounded-lg px-4 py-2 text-white focus:outline-none focus:border-reel-blue-light transition-colors resize-none"
              placeholder="Add a description... (Markdown supported)"
              rows={4}
            />
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full bg-reel-gray border border-reel-gray-light rounded-lg px-4 py-2 text-white focus:outline-none focus:border-reel-blue-light transition-colors"
              >
                <option value="backlog">📋 Backlog</option>
                <option value="in-progress">🔄 In Progress</option>
                <option value="done">✅ Done</option>
                <option value="blocked">⏸️ Blocked/Waiting</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full bg-reel-gray border border-reel-gray-light rounded-lg px-4 py-2 text-white focus:outline-none focus:border-reel-blue-light transition-colors"
              >
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>
          </div>

          {/* Category and Assignee */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full bg-reel-gray border border-reel-gray-light rounded-lg px-4 py-2 text-white focus:outline-none focus:border-reel-blue-light transition-colors"
              >
                <option value="marketing">Marketing</option>
                <option value="product">Product</option>
                <option value="research">Research</option>
                <option value="automation">Automation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Assignee
              </label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value as Assignee)}
                className="w-full bg-reel-gray border border-reel-gray-light rounded-lg px-4 py-2 text-white focus:outline-none focus:border-reel-blue-light transition-colors"
              >
                <option value="Arun">Arun</option>
                <option value="Arc">Arc</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-reel-gray border border-reel-gray-light rounded-lg px-4 py-2 text-white focus:outline-none focus:border-reel-blue-light transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-reel-blue-light hover:bg-reel-blue-bright text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {initialTask ? 'Update Task' : 'Create Task'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 bg-reel-gray hover:bg-reel-gray-light text-gray-300 font-medium py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
