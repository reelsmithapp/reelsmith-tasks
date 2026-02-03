import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FiEdit2, FiTrash2, FiClock, FiUser, FiCalendar } from 'react-icons/fi';
import { Task, PRIORITY_CONFIG, CATEGORY_CONFIG } from '../types';
import { formatDate, isOverdue } from '../utils/helpers';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit, onDelete }) => {
  const priorityConfig = PRIORITY_CONFIG[task.priority];
  const categoryConfig = CATEGORY_CONFIG[task.category];
  const overdueStatus = task.dueDate && isOverdue(task.dueDate);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            bg-reel-gray-light rounded-lg p-4 mb-3 
            border border-reel-gray hover:border-reel-blue-light
            transition-all duration-200 animate-fade-in
            ${snapshot.isDragging ? 'shadow-2xl rotate-2 scale-105' : 'shadow-md'}
          `}
        >
          {/* Header with title and actions */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-white font-medium text-sm flex-1 pr-2">
              {task.title}
            </h3>
            <div className="flex gap-1">
              <button
                onClick={() => onEdit(task)}
                className="p-1 hover:bg-reel-gray rounded text-gray-400 hover:text-reel-blue-light transition-colors"
                title="Edit task"
              >
                <FiEdit2 size={14} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1 hover:bg-reel-gray rounded text-gray-400 hover:text-red-400 transition-colors"
                title="Delete task"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-gray-400 text-xs mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Tags: Priority and Category */}
          <div className="flex gap-2 mb-3">
            <span
              className={`${priorityConfig.bg} ${priorityConfig.color} text-xs px-2 py-1 rounded-full font-medium`}
            >
              {priorityConfig.label}
            </span>
            <span
              className={`${categoryConfig.bg} ${categoryConfig.color} text-xs px-2 py-1 rounded-full font-medium`}
            >
              {categoryConfig.label}
            </span>
          </div>

          {/* Footer: Assignee and Due Date */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <FiUser size={12} />
              <span>{task.assignee}</span>
            </div>
            {task.dueDate && (
              <div className={`flex items-center gap-1 ${overdueStatus ? 'text-red-400' : ''}`}>
                {overdueStatus ? <FiClock size={12} /> : <FiCalendar size={12} />}
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};
