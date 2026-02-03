export type Priority = 'high' | 'medium' | 'low';
export type Category = 'Marketing' | 'Product' | 'Research' | 'Automation';
export type Assignee = 'Arun' | 'Arc';
export type ColumnId = 'backlog' | 'in-progress' | 'done' | 'blocked';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  category: Category;
  assignee: Assignee;
  dueDate?: string;
  createdAt: string;
  columnId: ColumnId;
}

export interface Column {
  id: ColumnId;
  title: string;
  icon: string;
  tasks: Task[];
}

export interface Filters {
  priority: Priority | 'all';
  category: Category | 'all';
  assignee: Assignee | 'all';
  search: string;
}

export interface KanbanData {
  columns: Column[];
  lastUpdated: string;
}
