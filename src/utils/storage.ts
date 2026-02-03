import { KanbanData } from '../types';

const STORAGE_KEY = 'reelsmith-kanban-data';

export const saveToStorage = (data: KanbanData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const loadFromStorage = (): KanbanData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
};

export const exportToJSON = (data: KanbanData): void => {
  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `reelsmith-kanban-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportToMarkdown = (data: KanbanData): void => {
  let markdown = '# ReelSmith Kanban Board\n\n';
  markdown += `*Last Updated: ${new Date(data.lastUpdated).toLocaleString()}*\n\n`;
  
  data.columns.forEach(column => {
    markdown += `## ${column.icon} ${column.title}\n\n`;
    
    if (column.tasks.length === 0) {
      markdown += '*No tasks*\n\n';
    } else {
      column.tasks.forEach(task => {
        markdown += `### ${task.title}\n\n`;
        markdown += `- **Priority:** ${task.priority.toUpperCase()}\n`;
        markdown += `- **Category:** ${task.category}\n`;
        markdown += `- **Assignee:** ${task.assignee}\n`;
        if (task.dueDate) {
          markdown += `- **Due Date:** ${new Date(task.dueDate).toLocaleDateString()}\n`;
        }
        markdown += `- **Created:** ${new Date(task.createdAt).toLocaleDateString()}\n`;
        if (task.description) {
          markdown += `\n${task.description}\n`;
        }
        markdown += '\n---\n\n';
      });
    }
  });
  
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `reelsmith-kanban-${new Date().toISOString().split('T')[0]}.md`;
  link.click();
  URL.revokeObjectURL(url);
};

export const importFromJSON = (file: File): Promise<KanbanData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
