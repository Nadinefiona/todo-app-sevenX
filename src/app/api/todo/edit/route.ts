import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../../db/drizzle';
import { todo } from '../../../../../db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));
    const { text } = await request.json();

    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    await db.update(todo).set({ text }).where(eq(todo.id, id));
    revalidatePath('/todos', 'page');
    return NextResponse.json(
      { message: 'Todo updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error updating todo' },
      { status: 500 }
    );
  }
}
