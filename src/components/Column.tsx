import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Task, TaskStatus, TASK_STATUS_CONFIG } from '../types';
import { TaskCard } from './TaskCard';

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export const Column: React.FC<ColumnProps> = ({ status, tasks, onEditTask, onDeleteTask }) => {
  const config = TASK_STATUS_CONFIG[status];

  return (
    <div className="flex flex-col bg-reel-gray rounded-lg p-4 min-w-[300px] max-w-[350px] h-fit">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{config.icon}</span>
          <h2 className="text-white font-semibold text-lg">{config.title}</h2>
        </div>
        <span className="bg-reel-gray-light text-gray-400 text-xs px-2 py-1 rounded-full font-medium">
          {tasks.length}
        </span>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex-1 min-h-[200px] transition-colors rounded-lg
              ${snapshot.isDraggingOver ? 'bg-reel-blue/10 border-2 border-dashed border-reel-blue-light' : ''}
            `}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
            
            {/* Empty State */}
            {tasks.length === 0 && (
              <div className="flex items-center justify-center h-32 text-gray-600 text-sm">
                Drop tasks here
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};
