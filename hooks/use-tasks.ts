import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '@/lib/api';
import { Task, CreateTaskData, UpdateTaskData } from '@/types/task';
import { toast } from 'sonner';

const TASKS_QUERY_KEY = ['tasks'];

export const useTasks = () => {
  return useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: taskApi.getTasks,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
      toast.success('Task created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create task');
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: taskApi.updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
      toast.success('Task updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update task');
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
      toast.success('Task deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete task');
    },
  });
};