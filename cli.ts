#!/usr/bin/env node

import { Command } from 'commander';
import * as dotenv from 'dotenv';
import { db, tasks, Task } from './server/db/index.js';
import { eq } from 'drizzle-orm';
import { format } from 'date-fns';

dotenv.config();

const program = new Command();

program
  .name('reelsmith-tasks')
  .description('CLI tool for managing ReelSmith tasks')
  .version('1.0.0');

// List all tasks
program
  .command('list')
  .description('List all tasks')
  .option('-s, --status <status>', 'Filter by status (backlog, in-progress, done, blocked)')
  .option('-p, --priority <priority>', 'Filter by priority (high, medium, low)')
  .option('-c, --category <category>', 'Filter by category (marketing, product, research, automation)')
  .option('-a, --assignee <assignee>', 'Filter by assignee (Arun, Arc)')
  .action(async (options) => {
    try {
      let allTasks = await db.select().from(tasks);
      
      // Apply filters
      if (options.status) {
        allTasks = allTasks.filter((t: Task) => t.status === options.status);
      }
      if (options.priority) {
        allTasks = allTasks.filter((t: Task) => t.priority === options.priority);
      }
      if (options.category) {
        allTasks = allTasks.filter((t: Task) => t.category === options.category);
      }
      if (options.assignee) {
        allTasks = allTasks.filter((t: Task) => t.assignee === options.assignee);
      }
      
      console.log(`\n📋 Found ${allTasks.length} task(s):\n`);
      
      allTasks.forEach((task: Task, index: number) => {
        console.log(`${index + 1}. [${task.id.slice(0, 8)}] ${task.title}`);
        console.log(`   Status: ${task.status} | Priority: ${task.priority} | Category: ${task.category}`);
        console.log(`   Assignee: ${task.assignee}`);
        if (task.dueDate) {
          console.log(`   Due: ${format(new Date(task.dueDate), 'PPP')}`);
        }
        if (task.description) {
          console.log(`   Description: ${task.description.substring(0, 100)}${task.description.length > 100 ? '...' : ''}`);
        }
        console.log('');
      });
      
      process.exit(0);
    } catch (error) {
      console.error('Error listing tasks:', error);
      process.exit(1);
    }
  });

// Add a new task
program
  .command('add <title>')
  .description('Add a new task')
  .requiredOption('-c, --category <category>', 'Category (marketing, product, research, automation)')
  .requiredOption('-a, --assignee <assignee>', 'Assignee (Arun, Arc)')
  .option('-d, --description <description>', 'Task description', '')
  .option('-p, --priority <priority>', 'Priority (high, medium, low)', 'medium')
  .option('-s, --status <status>', 'Status (backlog, in-progress, done, blocked)', 'backlog')
  .option('--due <date>', 'Due date (ISO format: YYYY-MM-DD)')
  .action(async (title, options) => {
    try {
      const [newTask] = await db.insert(tasks).values({
        title,
        description: options.description,
        status: options.status,
        priority: options.priority,
        category: options.category,
        assignee: options.assignee,
        dueDate: options.due ? new Date(options.due).toISOString() : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }).returning();
      
      console.log('\n✅ Task created successfully!');
      console.log(`ID: ${newTask.id}`);
      console.log(`Title: ${newTask.title}`);
      console.log(`Status: ${newTask.status}`);
      console.log(`Priority: ${newTask.priority}`);
      console.log(`Category: ${newTask.category}`);
      console.log(`Assignee: ${newTask.assignee}\n`);
      
      process.exit(0);
    } catch (error) {
      console.error('Error creating task:', error);
      process.exit(1);
    }
  });

// Update a task
program
  .command('update <id>')
  .description('Update a task')
  .option('-t, --title <title>', 'Task title')
  .option('-d, --description <description>', 'Task description')
  .option('-s, --status <status>', 'Status (backlog, in-progress, done, blocked)')
  .option('-p, --priority <priority>', 'Priority (high, medium, low)')
  .option('-c, --category <category>', 'Category (marketing, product, research, automation)')
  .option('-a, --assignee <assignee>', 'Assignee (Arun, Arc)')
  .option('--due <date>', 'Due date (ISO format: YYYY-MM-DD)')
  .action(async (id, options) => {
    try {
      const updates: any = {
        updatedAt: new Date().toISOString(),
      };
      
      if (options.title) updates.title = options.title;
      if (options.description) updates.description = options.description;
      if (options.status) updates.status = options.status;
      if (options.priority) updates.priority = options.priority;
      if (options.category) updates.category = options.category;
      if (options.assignee) updates.assignee = options.assignee;
      if (options.due) updates.dueDate = new Date(options.due).toISOString();
      
      const [updatedTask] = await db.update(tasks)
        .set(updates)
        .where(eq(tasks.id, id))
        .returning();
      
      if (!updatedTask) {
        console.error('❌ Task not found');
        process.exit(1);
      }
      
      console.log('\n✅ Task updated successfully!');
      console.log(`ID: ${updatedTask.id}`);
      console.log(`Title: ${updatedTask.title}`);
      console.log(`Status: ${updatedTask.status}`);
      console.log(`Priority: ${updatedTask.priority}`);
      console.log(`Category: ${updatedTask.category}`);
      console.log(`Assignee: ${updatedTask.assignee}\n`);
      
      process.exit(0);
    } catch (error) {
      console.error('Error updating task:', error);
      process.exit(1);
    }
  });

// Move a task to a different column
program
  .command('move <id> <status>')
  .description('Move a task to a different status column (backlog, in-progress, done, blocked)')
  .action(async (id, status) => {
    try {
      const [movedTask] = await db.update(tasks)
        .set({
          status,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(tasks.id, id))
        .returning();
      
      if (!movedTask) {
        console.error('❌ Task not found');
        process.exit(1);
      }
      
      console.log(`\n✅ Task moved to ${status}!`);
      console.log(`ID: ${movedTask.id}`);
      console.log(`Title: ${movedTask.title}\n`);
      
      process.exit(0);
    } catch (error) {
      console.error('Error moving task:', error);
      process.exit(1);
    }
  });

// Delete a task
program
  .command('delete <id>')
  .description('Delete a task')
  .action(async (id) => {
    try {
      const [deletedTask] = await db.delete(tasks)
        .where(eq(tasks.id, id))
        .returning();
      
      if (!deletedTask) {
        console.error('❌ Task not found');
        process.exit(1);
      }
      
      console.log('\n✅ Task deleted successfully!');
      console.log(`ID: ${deletedTask.id}`);
      console.log(`Title: ${deletedTask.title}\n`);
      
      process.exit(0);
    } catch (error) {
      console.error('Error deleting task:', error);
      process.exit(1);
    }
  });

// Show task details
program
  .command('show <id>')
  .description('Show detailed information about a task')
  .action(async (id) => {
    try {
      const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
      
      if (!task) {
        console.error('❌ Task not found');
        process.exit(1);
      }
      
      console.log('\n📋 Task Details:');
      console.log('================\n');
      console.log(`ID: ${task.id}`);
      console.log(`Title: ${task.title}`);
      console.log(`Description: ${task.description || '(no description)'}`);
      console.log(`Status: ${task.status}`);
      console.log(`Priority: ${task.priority}`);
      console.log(`Category: ${task.category}`);
      console.log(`Assignee: ${task.assignee}`);
      if (task.dueDate) {
        console.log(`Due Date: ${format(new Date(task.dueDate), 'PPP')}`);
      }
      console.log(`Created: ${format(new Date(task.createdAt), 'PPPpppp')}`);
      console.log(`Updated: ${format(new Date(task.updatedAt), 'PPPpppp')}`);
      console.log('');
      
      process.exit(0);
    } catch (error) {
      console.error('Error showing task:', error);
      process.exit(1);
    }
  });

program.parse();
