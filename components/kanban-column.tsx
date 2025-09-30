'use client';

import { Task, TaskStatus } from '@/types/task';
import { TaskCard } from './task-card';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (id: string) => void;
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
}

const statusConfig = {
  TODO: { color: 'bg-slate-100 border-slate-200', badge: 'bg-slate-500' },
  IN_PROGRESS: { color: 'bg-blue-50 border-blue-200', badge: 'bg-blue-500' },
  DONE: { color: 'bg-green-50 border-green-200', badge: 'bg-green-500' },
};

export function KanbanColumn({
  title,
  status,
  tasks,
  onTaskEdit,
  onTaskDelete,
  onTaskMove,
}: KanbanColumnProps) {
  const config = statusConfig[status];
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onTaskMove(taskId, status);
    }
  };

  return (
    <Card className={cn('h-fit', config.color)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">{title}</h2>
          <Badge className={cn('text-white text-xs', config.badge)}>
            {tasks.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent 
        className="space-y-3 min-h-[200px]"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', task.id);
            }}
            className="cursor-move"
          >
            <TaskCard
              task={task}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
            />
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">No tasks yet</p>
            <p className="text-xs mt-1">Drag tasks here or create new ones</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}