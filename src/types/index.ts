// Core types for the Kanban board

export type TaskStatus = 'backlog' | 'in-progress' | 'done' | 'blocked';

export type TaskPriority = 'high' | 'medium' | 'low';

export type TaskCategory = 'marketing' | 'product' | 'research' | 'automation';

export type Assignee = 'Arun' | 'Arc';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  assignee: Assignee;
  dueDate?: string; // ISO date string
  createdAt: string; // ISO date string
  archived?: boolean;
}

export interface Column {
  id: TaskStatus;
  title: string;
  icon: string;
  tasks: Task[];
}

export interface FilterState {
  priority: TaskPriority | 'all';
  category: TaskCategory | 'all';
  assignee: Assignee | 'all';
  search: string;
}

export interface KanbanState {
  tasks: Task[];
  filter: FilterState;
}

export const TASK_STATUS_CONFIG: Record<TaskStatus, { title: string; icon: string; color: string }> = {
  'backlog': { title: 'Backlog', icon: '📋', color: 'bg-gray-700' },
  'in-progress': { title: 'In Progress', icon: '🔄', color: 'bg-blue-700' },
  'done': { title: 'Done', icon: '✅', color: 'bg-green-700' },
  'blocked': { title: 'Blocked/Waiting', icon: '⏸️', color: 'bg-red-700' },
};

export const PRIORITY_CONFIG: Record<TaskPriority, { color: string; bg: string; label: string }> = {
  high: { color: 'text-red-400', bg: 'bg-red-900/30', label: 'High' },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-900/30', label: 'Medium' },
  low: { color: 'text-green-400', bg: 'bg-green-900/30', label: 'Low' },
};

export const CATEGORY_CONFIG: Record<TaskCategory, { color: string; bg: string; label: string }> = {
  marketing: { color: 'text-purple-400', bg: 'bg-purple-900/30', label: 'Marketing' },
  product: { color: 'text-blue-400', bg: 'bg-blue-900/30', label: 'Product' },
  research: { color: 'text-cyan-400', bg: 'bg-cyan-900/30', label: 'Research' },
  automation: { color: 'text-pink-400', bg: 'bg-pink-900/30', label: 'Automation' },
};
