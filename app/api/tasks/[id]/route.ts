import { NextRequest, NextResponse } from 'next/server';
import { mockDatabase } from '@/lib/mock-data';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updates = await request.json();
    
    const updatedTask = mockDatabase.updateTask(id, updates);

    if (!updatedTask) {
      return NextResponse.json(
        { error: 'Task not found', success: false },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ task: updatedTask, success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update task', success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const deleted = mockDatabase.deleteTask(id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Task not found', success: false },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete task', success: false },
      { status: 500 }
    );
  }
}