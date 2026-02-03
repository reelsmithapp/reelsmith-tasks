import { Hono } from 'hono';
import { db, tasks, Task } from '../db/index.js';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const app = new Hono();

// Validation schemas
const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().default(''),
  status: z.enum(['backlog', 'in-progress', 'done', 'blocked']).default('backlog'),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
  category: z.enum(['marketing', 'product', 'research', 'automation']),
  assignee: z.enum(['Arun', 'Arc']),
  dueDate: z.string().optional(),
  archived: z.string().default('false'),
});

const updateTaskSchema = taskSchema.partial();

const moveTaskSchema = z.object({
  status: z.enum(['backlog', 'in-progress', 'done', 'blocked']),
});

// GET /api/tasks - Get all tasks
app.get('/', async (c) => {
  try {
    const allTasks = await db.select().from(tasks);
    
    // Convert archived string to boolean for frontend
    const tasksWithBooleanArchived = allTasks.map((task: Task) => ({
      ...task,
      archived: task.archived === 'true',
    }));
    
    return c.json({
      success: true,
      data: tasksWithBooleanArchived,
      count: tasksWithBooleanArchived.length,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return c.json({
      success: false,
      error: 'Failed to fetch tasks',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, 500);
  }
});

// GET /api/tasks/:id - Get single task
app.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    
    if (!task) {
      return c.json({
        success: false,
        error: 'Task not found',
      }, 404);
    }
    
    return c.json({
      success: true,
      data: {
        ...task,
        archived: task.archived === 'true',
      },
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    return c.json({
      success: false,
      error: 'Failed to fetch task',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, 500);
  }
});

// POST /api/tasks - Create new task
app.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = taskSchema.parse(body);
    
    const [newTask] = await db.insert(tasks).values({
      ...validatedData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }).returning();
    
    return c.json({
      success: true,
      data: {
        ...newTask,
        archived: newTask.archived === 'true',
      },
      message: 'Task created successfully',
    }, 201);
  } catch (error) {
    console.error('Error creating task:', error);
    
    if (error instanceof z.ZodError) {
      return c.json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      }, 400);
    }
    
    return c.json({
      success: false,
      error: 'Failed to create task',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, 500);
  }
});

// PUT /api/tasks/:id - Update task
app.put('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const validatedData = updateTaskSchema.parse(body);
    
    const [updatedTask] = await db.update(tasks)
      .set({
        ...validatedData,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(tasks.id, id))
      .returning();
    
    if (!updatedTask) {
      return c.json({
        success: false,
        error: 'Task not found',
      }, 404);
    }
    
    return c.json({
      success: true,
      data: {
        ...updatedTask,
        archived: updatedTask.archived === 'true',
      },
      message: 'Task updated successfully',
    });
  } catch (error) {
    console.error('Error updating task:', error);
    
    if (error instanceof z.ZodError) {
      return c.json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      }, 400);
    }
    
    return c.json({
      success: false,
      error: 'Failed to update task',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, 500);
  }
});

// PATCH /api/tasks/:id/move - Move task to different column
app.patch('/:id/move', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { status } = moveTaskSchema.parse(body);
    
    const [movedTask] = await db.update(tasks)
      .set({
        status,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(tasks.id, id))
      .returning();
    
    if (!movedTask) {
      return c.json({
        success: false,
        error: 'Task not found',
      }, 404);
    }
    
    return c.json({
      success: true,
      data: {
        ...movedTask,
        archived: movedTask.archived === 'true',
      },
      message: `Task moved to ${status}`,
    });
  } catch (error) {
    console.error('Error moving task:', error);
    
    if (error instanceof z.ZodError) {
      return c.json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      }, 400);
    }
    
    return c.json({
      success: false,
      error: 'Failed to move task',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, 500);
  }
});

// DELETE /api/tasks/:id - Delete task
app.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    const [deletedTask] = await db.delete(tasks)
      .where(eq(tasks.id, id))
      .returning();
    
    if (!deletedTask) {
      return c.json({
        success: false,
        error: 'Task not found',
      }, 404);
    }
    
    return c.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    return c.json({
      success: false,
      error: 'Failed to delete task',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, 500);
  }
});

export default app;
