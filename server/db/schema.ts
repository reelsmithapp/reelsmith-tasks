import { pgTable, text, timestamp, uuid, pgEnum } from 'drizzle-orm/pg-core';

// Enums matching frontend types
export const taskStatusEnum = pgEnum('task_status', ['backlog', 'in-progress', 'done', 'blocked']);
export const taskPriorityEnum = pgEnum('task_priority', ['high', 'medium', 'low']);
export const taskCategoryEnum = pgEnum('task_category', ['marketing', 'product', 'research', 'automation']);
export const assigneeEnum = pgEnum('assignee', ['Arun', 'Arc']);

// Tasks table
export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull().default(''),
  status: taskStatusEnum('status').notNull().default('backlog'),
  priority: taskPriorityEnum('priority').notNull().default('medium'),
  category: taskCategoryEnum('category').notNull(),
  assignee: assigneeEnum('assignee').notNull(),
  dueDate: timestamp('due_date', { mode: 'string' }),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
  archived: text('archived').default('false'), // Store as text for compatibility
});

// Type exports for TypeScript
export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
