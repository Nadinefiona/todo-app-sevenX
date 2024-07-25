import db from "../../../../../db/drizzle";
import { todo } from "../../../../../db/schema";

export const addTodo = async ( text: string) => {
  await db.insert(todo).values({
    text: text,
  });
};
