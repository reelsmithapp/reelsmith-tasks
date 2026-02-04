import React, { useState, useEffect } from 'react';
import { Task, TaskStatus, TaskPriority, TaskCategory, Assignee } from '../types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FiCopy, FiCheck } from 'react-icons/fi';

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
  const [copied, setCopied] = useState(false);

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

  const handleCopyTaskId = async () => {
    if (!editingTask?.id) return;
    
    try {
      await navigator.clipboard.writeText(editingTask.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy task ID:', err);
    }
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto max-sm:top-0 max-sm:translate-y-0 max-sm:rounded-t-none max-sm:max-h-screen max-sm:h-[calc(100vh-env(safe-area-inset-bottom))]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl flex-1">
              {editingTask ? 'Edit Task' : 'New Task'}
            </DialogTitle>
            {editingTask && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleCopyTaskId}
                className="flex-shrink-0 -mt-1 -mr-2"
                title="Copy task ID"
              >
                {copied ? (
                  <>
                    <FiCheck className="h-4 w-4 mr-1" />
                    <span className="text-xs">Copied!</span>
                  </>
                ) : (
                  <>
                    <FiCopy className="h-4 w-4 mr-1" />
                    <span className="text-xs hidden sm:inline">Copy ID</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              required
              autoFocus
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description... (Markdown supported)"
              rows={4}
            />
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as TaskStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="backlog">Backlog</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                  <SelectItem value="blocked">Blocked/Waiting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as TaskPriority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category and Assignee */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as TaskCategory)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="automation">Automation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Assignee</Label>
              <Select value={assignee} onValueChange={(v) => setAssignee(v as Assignee)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arun">Arun</SelectItem>
                  <SelectItem value="Arc">Arc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <DialogFooter className="gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient">
              {editingTask ? 'Update Task' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
