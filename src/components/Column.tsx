import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Column as ColumnType, Task } from '../types';
import { TaskCard } from './TaskCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ColumnProps {
  column: ColumnType;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const Column: React.FC<ColumnProps> = ({ column, onEditTask, onDeleteTask }) => {
  return (
    <div className="flex-shrink-0 w-72 sm:w-80 snap-start">
      <Card variant="glass" className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="text-2xl">{column.icon}</span>
              {column.title}
            </CardTitle>
            <Badge variant="outline" className="bg-obsidian-elevated">
              {column.tasks.length}
            </Badge>
          </div>
        </CardHeader>

        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn(
                "min-h-[200px] px-4 pb-4 transition-colors rounded-lg",
                snapshot.isDraggingOver && "bg-inferno-500/10"
              )}
            >
              {column.tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={cn(
                        snapshot.isDragging && "z-50 rotate-2 scale-105"
                      )}
                      style={{
                        ...provided.draggableProps.style,
                      }}
                    >
                      <TaskCard
                        task={task}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card>
    </div>
  );
};
