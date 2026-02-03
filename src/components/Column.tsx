import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Column as ColumnType, Task } from '../types';
import { TaskCard } from './TaskCard';

interface ColumnProps {
  column: ColumnType;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const Column: React.FC<ColumnProps> = ({ column, onEditTask, onDeleteTask }) => {
  return (
    <div className="flex-shrink-0 w-80">
      <div className="bg-dark-300 rounded-lg p-4 h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-2xl">{column.icon}</span>
            {column.title}
          </h2>
          <span className="bg-dark-200 text-gray-400 text-xs px-2 py-1 rounded-full">
            {column.tasks.length}
          </span>
        </div>

        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`min-h-[200px] transition-colors ${
                snapshot.isDraggingOver ? 'bg-primary-900/20 rounded-lg' : ''
              }`}
            >
              {column.tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={snapshot.isDragging ? 'opacity-50' : ''}
                    >
                      <TaskCard
                        task={task}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};
