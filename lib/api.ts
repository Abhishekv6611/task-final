import axios from 'axios';
import { Task, CreateTaskData, UpdateTaskData } from '@/types/task';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    const { data } = await api.get<{ tasks: Task[]; success: boolean }>('/tasks');
    return data.tasks;
  },

  createTask: async (taskData: CreateTaskData): Promise<Task> => {
    const { data } = await api.post<{ task: Task; success: boolean }>('/tasks', taskData);
    return data.task;
  },

  updateTask: async ({ id, ...updates }: UpdateTaskData): Promise<Task> => {
    const { data } = await api.put<{ task: Task; success: boolean }>(`/tasks/${id}`, updates);
    return data.task;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};