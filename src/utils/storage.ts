import { Task } from '../types';

const STORAGE_KEY = 'reelsmith-kanban-tasks';

/**
 * Load tasks from localStorage
 */
export const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getInitialTasks();
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return getInitialTasks();
  }
};

/**
 * Save tasks to localStorage
 */
export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

/**
 * Export tasks to JSON
 */
export const exportToJSON = (tasks: Task[]): void => {
  const dataStr = JSON.stringify(tasks, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `reelsmith-tasks-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export tasks to Markdown
 */
export const exportToMarkdown = (tasks: Task[]): void => {
  const tasksByStatus = tasks.reduce((acc, task) => {
    if (!acc[task.status]) acc[task.status] = [];
    acc[task.status].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  let markdown = `# ReelSmith Tasks\n\nExported: ${new Date().toLocaleString()}\n\n`;

  const statusOrder: Array<Task['status']> = ['backlog', 'in-progress', 'done', 'blocked'];
  const statusTitles = {
    'backlog': '📋 Backlog',
    'in-progress': '🔄 In Progress',
    'done': '✅ Done',
    'blocked': '⏸️ Blocked/Waiting',
  };

  statusOrder.forEach((status) => {
    const statusTasks = tasksByStatus[status] || [];
    if (statusTasks.length === 0) return;

    markdown += `## ${statusTitles[status]}\n\n`;
    
    statusTasks.forEach((task) => {
      markdown += `### ${task.title}\n\n`;
      markdown += `- **Priority:** ${task.priority}\n`;
      markdown += `- **Category:** ${task.category}\n`;
      markdown += `- **Assignee:** ${task.assignee}\n`;
      if (task.dueDate) {
        markdown += `- **Due Date:** ${new Date(task.dueDate).toLocaleDateString()}\n`;
      }
      markdown += `- **Created:** ${new Date(task.createdAt).toLocaleDateString()}\n`;
      if (task.description) {
        markdown += `\n${task.description}\n`;
      }
      markdown += `\n---\n\n`;
    });
  });

  const dataBlob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `reelsmith-tasks-${new Date().toISOString().split('T')[0]}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Import tasks from JSON file
 */
export const importFromJSON = (file: File): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const tasks = JSON.parse(e.target?.result as string);
        resolve(tasks);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

/**
 * Get initial tasks for first-time users
 */
const getInitialTasks = (): Task[] => {
  const now = new Date().toISOString();
  return [
    {
      id: '1',
      title: 'Twitter Strategy - Tweet #1 posting',
      description: 'Create and schedule the first announcement tweet for ReelSmith launch. Focus on the AI film generation value proposition.',
      status: 'in-progress',
      priority: 'high',
      category: 'marketing',
      assignee: 'Arun',
      createdAt: now,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      title: 'Reddit Discovery - Test automation script',
      description: 'Build and test the Reddit automation script for discovering film-related discussions and communities.',
      status: 'backlog',
      priority: 'medium',
      category: 'automation',
      assignee: 'Arc',
      createdAt: now,
    },
    {
      id: '3',
      title: 'India AI Film Festival - Script development',
      description: 'Develop the competition entry script. Research cultural themes, story arc, and visual style.',
      status: 'backlog',
      priority: 'high',
      category: 'product',
      assignee: 'Arun',
      createdAt: now,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '4',
      title: 'Master Automation Plan - Implementation',
      description: 'Implement the comprehensive automation strategy for social media, content distribution, and community engagement.',
      status: 'in-progress',
      priority: 'high',
      category: 'automation',
      assignee: 'Arc',
      createdAt: now,
    },
    {
      id: '5',
      title: 'LLM Research',
      description: 'Complete research on LLM capabilities for film script generation, character development, and story structure. ✅ Completed successfully.',
      status: 'done',
      priority: 'medium',
      category: 'research',
      assignee: 'Arc',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '6',
      title: 'Film Concepts Research',
      description: 'Research successful independent film concepts, story structures, and visual storytelling techniques. ✅ Completed with comprehensive findings.',
      status: 'done',
      priority: 'medium',
      category: 'research',
      assignee: 'Arun',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
};
