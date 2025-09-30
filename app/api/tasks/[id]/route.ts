import { NextRequest, NextResponse } from 'next/server';
import { mockDatabase } from '@/lib/mock-data';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ await the params

  try {
    // Your update logic here
    return NextResponse.json({
      success: true,
      task: { id, name: "Updated task" }, // example response
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update task" },
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