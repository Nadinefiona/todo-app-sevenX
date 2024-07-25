import { eq } from 'drizzle-orm';
import { todo } from '../../../../../db/schema';
import db from '../../../../../db/drizzle';

export const editTodo = async (id: number, text: string) => {
  await db
    .update(todo)
    .set({ text })
    .where(eq(todo.id, id));
};
