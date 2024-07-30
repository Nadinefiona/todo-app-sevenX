import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../../db/drizzle';
import { todo } from '../../../../../db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));

    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    await db.delete(todo).where(eq(todo.id, id));
    revalidatePath('/todos', 'page');
    return NextResponse.json(
      { message: 'Todo deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error deleting todo' },
      { status: 500 }
    );
  }
}
