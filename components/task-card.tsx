'use client';

import { Task, TaskPriority } from '@/types/task';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard as Edit2, Trash2, Clock, TriangleAlert as AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityConfig = {
  LOW: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Clock },
  MEDIUM: { color: 'bg-amber-100 text-amber-800 border-amber-200', icon: AlertTriangle },
  HIGH: { color: 'bg-red-100 text-red-800 border-red-200', icon: AlertTriangle },
};

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const priority = task.priority || 'LOW';
  const PriorityIcon = priorityConfig[priority].icon;

  return (
    <Card className="group hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
            {task.title}
          </h3>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {task.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">
            {task.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className={cn(
              'text-xs font-medium',
              priorityConfig[priority].color
            )}
          >
            <PriorityIcon className="w-3 h-3 mr-1" />
            {priority.toLowerCase()}
          </Badge>
          
          <span className="text-xs text-gray-400">
            {new Date(task.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}