import { NextRequest, NextResponse } from 'next/server';
import { mockDatabase } from '@/lib/mock-data';
import { CreateTaskData } from '@/types/task';

export async function GET() {
  try {
    const tasks = mockDatabase.getTasks();
    return NextResponse.json({ tasks, success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks', success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const taskData: CreateTaskData = await request.json();
    
    // Basic validation
    if (!taskData.title?.trim()) {
      return NextResponse.json(
        { error: 'Title is required', success: false },
        { status: 400 }
      );
    }
    
    const newTask = mockDatabase.createTask(taskData);
    return NextResponse.json({ task: newTask, success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task', success: false },
      { status: 500 }
    );
  }
}