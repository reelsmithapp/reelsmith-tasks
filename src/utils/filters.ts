import { Task, FilterState } from '../types';

/**
 * Filter tasks based on current filter state
 */
export const filterTasks = (tasks: Task[], filter: FilterState): Task[] => {
  return tasks.filter((task) => {
    // Exclude archived tasks
    if (task.archived) return false;

    // Priority filter
    if (filter.priority !== 'all' && task.priority !== filter.priority) {
      return false;
    }

    // Category filter
    if (filter.category !== 'all' && task.category !== filter.category) {
      return false;
    }

    // Assignee filter
    if (filter.assignee !== 'all' && task.assignee !== filter.assignee) {
      return false;
    }

    // Search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(searchLower);
      const matchesDescription = task.description.toLowerCase().includes(searchLower);
      if (!matchesTitle && !matchesDescription) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Group tasks by status
 */
export const groupTasksByStatus = (tasks: Task[]) => {
  return tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as Record<string, Task[]>);
};
