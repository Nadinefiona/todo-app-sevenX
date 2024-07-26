import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../../db/drizzle';
import { todo } from '../../../../../db/schema';
import { eq, not } from 'drizzle-orm';

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));

    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    await db.update(todo).set({ done: not(todo.done) }).where(eq(todo.id, id));
    return NextResponse.json({ message: 'Todo toggled successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error toggling todo' }, { status: 500 });
  }
}
