import { Task } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Add auth token to headers if available
      const token = getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Merge with any additional headers from options
      if (options?.headers) {
        Object.assign(headers, options.headers);
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        // Special handling for 401 Unauthorized
        if (response.status === 401) {
          // Clear stored token and reload to show login
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_username');
          window.location.reload();
          throw new Error('Session expired. Please log in again.');
        }

        throw new Error(data.error || data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Task endpoints
  async getTasks(): Promise<ApiResponse<Task[]>> {
    return this.request<Task[]>('/api/tasks');
  }

  async getTask(id: string): Promise<ApiResponse<Task>> {
    return this.request<Task>(`/api/tasks/${id}`);
  }

  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Task>> {
    return this.request<Task>('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<ApiResponse<Task>> {
    return this.request<Task>(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async moveTask(id: string, status: Task['status']): Promise<ApiResponse<Task>> {
    return this.request<Task>(`/api/tasks/${id}/move`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async deleteTask(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // Export endpoints
  async exportJSON(): Promise<void> {
    try {
      const headers: Record<string, string> = {};
      const token = getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${this.baseUrl}/api/export/json`, { headers });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `reelsmith-tasks-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export JSON error:', error);
      throw error;
    }
  }

  async exportMarkdown(): Promise<void> {
    try {
      const headers: Record<string, string> = {};
      const token = getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${this.baseUrl}/api/export/markdown`, { headers });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `reelsmith-tasks-${new Date().toISOString().split('T')[0]}.md`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export Markdown error:', error);
      throw error;
    }
  }
}

export const api = new ApiClient(API_BASE_URL);

// Offline storage fallback
const STORAGE_KEY = 'reelsmith-tasks-offline';

export const saveOffline = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save offline:', error);
  }
};

export const loadOffline = (): Task[] | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load offline data:', error);
    return null;
  }
};

export const clearOffline = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear offline data:', error);
  }
};
