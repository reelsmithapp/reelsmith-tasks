import { KanbanData } from '../types';

export const getInitialData = (): KanbanData => {
  return {
    columns: [
      {
        id: 'backlog',
        title: 'Backlog',
        icon: '📋',
        tasks: [
          {
            id: 'task-2',
            title: 'Reddit Discovery - Test automation script',
            description: 'Build and test the Reddit discovery automation script to find relevant discussions and communities for ReelSmith.',
            priority: 'high',
            category: 'Automation',
            assignee: 'Arc',
            createdAt: new Date('2026-02-01').toISOString(),
            dueDate: new Date('2026-02-10').toISOString(),
            columnId: 'backlog',
          },
          {
            id: 'task-3',
            title: 'India AI Film Festival - Script development',
            description: 'Develop the complete script for the India AI Film Festival submission, including story, dialogue, and scene breakdown.',
            priority: 'medium',
            category: 'Product',
            assignee: 'Arun',
            createdAt: new Date('2026-02-01').toISOString(),
            dueDate: new Date('2026-03-01').toISOString(),
            columnId: 'backlog',
          },
        ],
      },
      {
        id: 'in-progress',
        title: 'In Progress',
        icon: '🔄',
        tasks: [
          {
            id: 'task-1',
            title: 'Twitter Strategy - Tweet #1 posting',
            description: 'Craft and post the first strategic tweet for ReelSmith launch. Focus on AI filmmaking and value proposition.',
            priority: 'high',
            category: 'Marketing',
            assignee: 'Arun',
            createdAt: new Date('2026-02-02').toISOString(),
            dueDate: new Date('2026-02-04').toISOString(),
            columnId: 'in-progress',
          },
          {
            id: 'task-4',
            title: 'Master Automation Plan - Implementation',
            description: 'Implement the comprehensive automation plan for ReelSmith marketing, including social media, content generation, and analytics.',
            priority: 'high',
            category: 'Automation',
            assignee: 'Arc',
            createdAt: new Date('2026-02-01').toISOString(),
            dueDate: new Date('2026-02-15').toISOString(),
            columnId: 'in-progress',
          },
        ],
      },
      {
        id: 'done',
        title: 'Done',
        icon: '✅',
        tasks: [
          {
            id: 'task-5',
            title: 'LLM Research - Complete',
            description: 'Completed comprehensive research on LLM providers, capabilities, and pricing for ReelSmith integration.',
            priority: 'medium',
            category: 'Research',
            assignee: 'Arc',
            createdAt: new Date('2026-01-28').toISOString(),
            columnId: 'done',
          },
          {
            id: 'task-6',
            title: 'Film Concepts Research - Complete',
            description: 'Completed research on successful AI film concepts, storytelling techniques, and festival requirements.',
            priority: 'medium',
            category: 'Research',
            assignee: 'Arun',
            createdAt: new Date('2026-01-28').toISOString(),
            columnId: 'done',
          },
        ],
      },
      {
        id: 'blocked',
        title: 'Blocked/Waiting',
        icon: '⏸️',
        tasks: [],
      },
    ],
    lastUpdated: new Date().toISOString(),
  };
};
