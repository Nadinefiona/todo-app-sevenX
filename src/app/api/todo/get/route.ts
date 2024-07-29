import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../../db/drizzle';
import { todo } from '../../../../../db/schema';
import { asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const data = await db.select().from(todo).orderBy(asc(todo.id));
    const plainData = data.map(item => ({ ...item })); 
    return NextResponse.json(plainData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching todos' }, { status: 500 });
  }
}
