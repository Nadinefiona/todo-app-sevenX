import db from '../../../../../db/drizzle';
import { todo } from '../../../../../db/schema';
import { eq } from 'drizzle-orm';

export const deleteTodo = async (id: number) => {
  await db
    .delete(todo)
    .where(eq(todo.id, id));
};
