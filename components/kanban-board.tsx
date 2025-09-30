'use client';

import { useState } from 'react';
import { Task, TaskStatus } from '@/types/task';
import { KanbanColumn } from './kanban-column';
import { TaskFormModal } from './task-form-modal';
import { useTasks, useUpdateTask, useDeleteTask } from '@/hooks/use-tasks';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const columns = [
  { title: 'To Do', status: 'TODO' as TaskStatus },
  { title: 'In Progress', status: 'IN_PROGRESS' as TaskStatus },
  { title: 'Done', status: 'DONE' as TaskStatus },
];

export function KanbanBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { data: tasks = [], isLoading, isError, refetch } = useTasks();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleTaskEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleTaskDelete = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask.mutateAsync(taskId);
    }
  };

  const handleTaskMove = async (taskId: string, newStatus: TaskStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.status !== newStatus) {
      await updateTask.mutateAsync({
        id: taskId,
        status: newStatus,
      });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const getTasksByStatus = (status: TaskStatus) =>
    tasks.filter(task => task.status === status);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <Alert className="max-w-md mx-auto mt-20">
            <AlertDescription className="text-center">
              Failed to load tasks. Please try again.
              <Button
                variant="outline"
                size="sm"
                className="ml-2"
                onClick={() => refetch()}
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">TaskFlow</h1>
            <p className="text-gray-600 mt-1">
              Manage your tasks efficiently with our Kanban board
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {columns.map(column => {
            const columnTasks = getTasksByStatus(column.status);
            return (
              <div
                key={column.status}
                className="bg-white rounded-lg p-4 shadow-sm border"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    {column.title}
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    {columnTasks.length}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map(column => (
            <KanbanColumn
              key={column.status}
              title={column.title}
              status={column.status}
              tasks={getTasksByStatus(column.status)}
              onTaskEdit={handleTaskEdit}
              onTaskDelete={handleTaskDelete}
              onTaskMove={handleTaskMove}
            />
          ))}
        </div>

        {/* Task Modal */}
        <TaskFormModal
          open={isModalOpen}
          onOpenChange={handleModalClose}
          task={editingTask}
        />
      </div>
    </div>
  );
}