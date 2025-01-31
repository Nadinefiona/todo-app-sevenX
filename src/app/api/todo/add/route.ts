import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../../db/drizzle';
import { todo } from '../../../../../db/schema';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    await db.insert(todo).values({ text });
    revalidatePath('/todos', 'page');
    return NextResponse.json(
      { message: 'Todo added successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error adding todo' }, { status: 500 });
  }
}
