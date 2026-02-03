import { Hono } from 'hono';
import { db, tasks, Task } from '../db/index.js';
import { format } from 'date-fns';

const app = new Hono();

// Helper to format task for markdown
function formatTaskMarkdown(task: Task): string {
  const lines = [];
  lines.push(`### ${task.title}`);
  lines.push('');
  lines.push(`**Status:** ${task.status}`);
  lines.push(`**Priority:** ${task.priority}`);
  lines.push(`**Category:** ${task.category}`);
  lines.push(`**Assignee:** ${task.assignee}`);
  
  if (task.dueDate) {
    lines.push(`**Due Date:** ${format(new Date(task.dueDate), 'PPP')}`);
  }
  
  lines.push(`**Created:** ${format(new Date(task.createdAt), 'PPP')}`);
  
  if (task.description) {
    lines.push('');
    lines.push('**Description:**');
    lines.push(task.description);
  }
  
  lines.push('');
  lines.push('---');
  lines.push('');
  
  return lines.join('\n');
}

// GET /api/export/json - Export all tasks as JSON
app.get('/json', async (c) => {
  try {
    const allTasks = await db.select().from(tasks);
    
    const tasksWithBooleanArchived = allTasks.map(task => ({
      ...task,
      archived: task.archived === 'true',
    }));
    
    c.header('Content-Type', 'application/json');
    c.header('Content-Disposition', `attachment; filename="reelsmith-tasks-${new Date().toISOString().split('T')[0]}.json"`);
    
    return c.json({
      exportedAt: new Date().toISOString(),
      taskCount: tasksWithBooleanArchived.length,
      tasks: tasksWithBooleanArchived,
    });
  } catch (error) {
    console.error('Error exporting tasks as JSON:', error);
    return c.json({
      success: false,
      error: 'Failed to export tasks',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, 500);
  }
});

// GET /api/export/markdown - Export all tasks as Markdown
app.get('/markdown', async (c) => {
  try {
    const allTasks = await db.select().from(tasks);
    
    // Group tasks by status
    const tasksByStatus = {
      backlog: allTasks.filter((t: Task) => t.status === 'backlog'),
      'in-progress': allTasks.filter((t: Task) => t.status === 'in-progress'),
      done: allTasks.filter((t: Task) => t.status === 'done'),
      blocked: allTasks.filter((t: Task) => t.status === 'blocked'),
    };
    
    const markdown = [];
    markdown.push('# ReelSmith Tasks Export');
    markdown.push('');
    markdown.push(`**Exported:** ${format(new Date(), 'PPPPpppp')}`);
    markdown.push(`**Total Tasks:** ${allTasks.length}`);
    markdown.push('');
    markdown.push('---');
    markdown.push('');
    
    // Backlog
    markdown.push('## 📋 Backlog');
    markdown.push('');
    if (tasksByStatus.backlog.length > 0) {
      tasksByStatus.backlog.forEach((task: Task) => {
        markdown.push(formatTaskMarkdown(task));
      });
    } else {
      markdown.push('*No tasks in backlog*');
      markdown.push('');
    }
    
    // In Progress
    markdown.push('## 🔄 In Progress');
    markdown.push('');
    if (tasksByStatus['in-progress'].length > 0) {
      tasksByStatus['in-progress'].forEach((task: Task) => {
        markdown.push(formatTaskMarkdown(task));
      });
    } else {
      markdown.push('*No tasks in progress*');
      markdown.push('');
    }
    
    // Done
    markdown.push('## ✅ Done');
    markdown.push('');
    if (tasksByStatus.done.length > 0) {
      tasksByStatus.done.forEach((task: Task) => {
        markdown.push(formatTaskMarkdown(task));
      });
    } else {
      markdown.push('*No completed tasks*');
      markdown.push('');
    }
    
    // Blocked
    markdown.push('## ⏸️ Blocked/Waiting');
    markdown.push('');
    if (tasksByStatus.blocked.length > 0) {
      tasksByStatus.blocked.forEach((task: Task) => {
        markdown.push(formatTaskMarkdown(task));
      });
    } else {
      markdown.push('*No blocked tasks*');
      markdown.push('');
    }
    
    const content = markdown.join('\n');
    
    c.header('Content-Type', 'text/markdown');
    c.header('Content-Disposition', `attachment; filename="reelsmith-tasks-${new Date().toISOString().split('T')[0]}.md"`);
    
    return c.text(content);
  } catch (error) {
    console.error('Error exporting tasks as Markdown:', error);
    return c.json({
      success: false,
      error: 'Failed to export tasks',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, 500);
  }
});

export default app;
