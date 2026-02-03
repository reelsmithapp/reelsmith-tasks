import React from 'react';
import { Task, TaskPriority, TaskCategory } from '../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FiEdit2, FiTrash2, FiCalendar, FiUser, FiTag } from 'react-icons/fi';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const priorityVariantMap: Record<TaskPriority, 'high' | 'medium' | 'low'> = {
  high: 'high',
  medium: 'medium',
  low: 'low',
};

const categoryVariantMap: Record<TaskCategory, 'marketing' | 'product' | 'research' | 'automation'> = {
  marketing: 'marketing',
  product: 'product',
  research: 'research',
  automation: 'automation',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <Card variant="glass" className="mb-3 group cursor-pointer animate-crystallize hover:-translate-y-1 hover:shadow-xl hover:shadow-plasma-500/10">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="group-hover:text-inferno-400 transition-colors pr-2 flex-1">
            {task.title}
          </CardTitle>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-inferno-400"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              title="Edit task"
            >
              <FiEdit2 size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
              title="Delete task"
            >
              <FiTrash2 size={14} />
            </Button>
          </div>
        </div>
        {task.description && (
          <CardDescription className="mt-1">{task.description}</CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant={priorityVariantMap[task.priority]}>
            {task.priority.toUpperCase()}
          </Badge>
          <Badge variant={categoryVariantMap[task.category]}>
            <FiTag size={10} />
            {task.category}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
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
      </CardContent>
    </Card>
  );
};
