import { Task } from '@/types/task';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage for tasks
let tasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Design new landing page',
    description: 'Create mockups and wireframes for the new landing page',
    status: 'TODO',
    priority: 'HIGH',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Set up CI/CD pipeline',
    description: 'Configure automated testing and deployment',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Write unit tests',
    description: 'Add comprehensive test coverage for core components',
    status: 'DONE',
    priority: 'LOW',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Review pull requests',
    description: 'Review pending PRs and provide feedback',
    status: 'TODO',
    priority: 'MEDIUM',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Update documentation',
    description: 'Update API documentation with latest changes',
    status: 'IN_PROGRESS',
    priority: 'LOW',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockDatabase = {
  getTasks: () => [...tasks],
  
  createTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    return newTask;
  },
  
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return null;
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return tasks[taskIndex];
  },
  
  deleteTask: (id: string) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return false;
    
    tasks.splice(taskIndex, 1);
    return true;
  },
};