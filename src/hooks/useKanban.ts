import { useState, useEffect, useCallback } from 'react';
import { Task, FilterState, TaskStatus } from '../types';
import { loadTasks, saveTasks } from '../utils/storage';
import { filterTasks } from '../utils/filters';
import { generateId } from '../utils/helpers';

export const useKanban = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterState>({
    priority: 'all',
    category: 'all',
    assignee: 'all',
    search: '',
  });

  // Load tasks from localStorage on mount
  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
  }, []);

  // Auto-save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      saveTasks(tasks);
    }
  }, [tasks]);

  // Get filtered tasks
  const filteredTasks = filterTasks(tasks, filter);

  // Add a new task
  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  }, []);

  // Update an existing task
  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  }, []);

  // Delete a task
  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // Move a task to a different status
  const moveTask = useCallback((id: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
    );
  }, []);

  // Archive completed tasks
  const archiveCompletedTasks = useCallback(() => {
    setTasks((prev) =>
      prev.map((task) =>
        task.status === 'done' ? { ...task, archived: true } : task
      )
    );
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilter({
      priority: 'all',
      category: 'all',
      assignee: 'all',
      search: '',
    });
  }, []);

  // Update a specific filter
  const updateFilter = useCallback((key: keyof FilterState, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Import tasks (replace all)
  const importTasks = useCallback((importedTasks: Task[]) => {
    setTasks(importedTasks);
  }, []);

  return {
    tasks,
    filteredTasks,
    filter,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    archiveCompletedTasks,
    clearFilters,
    updateFilter,
    importTasks,
  };
};
