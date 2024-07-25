import db from "../../../../../db/drizzle";
import { todo } from "../../../../../db/schema";
import { eq, not } from 'drizzle-orm';

export const toggleTodo = async (id: number) => {
  await db
    .update(todo)
    .set({
      done: not(todo.done),
    })
    .where(eq(todo.id, id));
};
