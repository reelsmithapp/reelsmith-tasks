import React from 'react';
import { Task, TaskPriority } from '../types';
import { FiEdit2, FiTrash2, FiCalendar, FiUser, FiTag } from 'react-icons/fi';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const priorityColors: Record<TaskPriority, string> = {
  high: 'bg-red-500/20 text-red-400 border-red-500/50',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  low: 'bg-green-500/20 text-green-400 border-green-500/50',
};

const categoryColors: Record<string, string> = {
  Marketing: 'bg-purple-500/20 text-purple-400',
  Product: 'bg-blue-500/20 text-blue-400',
  Research: 'bg-cyan-500/20 text-cyan-400',
  Automation: 'bg-orange-500/20 text-orange-400',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="card p-4 mb-3 group cursor-pointer animate-fade-in">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-white font-semibold text-sm flex-1 pr-2 group-hover:text-primary-400 transition-colors">
          {task.title}
        </h3>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="p-1 hover:bg-dark-200 rounded text-gray-400 hover:text-primary-400 transition-colors"
            title="Edit task"
          >
            <FiEdit2 size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="p-1 hover:bg-dark-200 rounded text-gray-400 hover:text-red-400 transition-colors"
            title="Delete task"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-gray-400 text-xs mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`badge ${priorityColors[task.priority]} border`}>
          {task.priority.toUpperCase()}
        </span>
        <span className={`badge ${categoryColors[task.category]}`}>
          <FiTag className="inline mr-1" size={10} />
          {task.category}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <FiUser size={12} />
            {task.assignee}
          </span>
          {task.dueDate && (
            <span className="flex items-center gap-1">
              <FiCalendar size={12} />
              {format(new Date(task.dueDate), 'MMM dd')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
