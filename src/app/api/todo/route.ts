import { NextResponse } from 'next/server';
import { addTodo } from './add/route';
import { editTodo } from './edit/route';
import { deleteTodo } from './delete/route';
import { getData } from './get/route';

export async function POST(request: Request) {
  try {
    const {  text } = await request.json();  
    await addTodo( text); 
    return NextResponse.json({ message: 'List created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating list' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));

    const { text } = await request.json();

    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    await editTodo(id, text);
    return NextResponse.json({ message: 'List updated successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating list' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const list = await getData();
    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching list' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));

    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    await deleteTodo(id);
    return NextResponse.json({ message: 'List deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting list' }, { status: 500 });
  }
}
