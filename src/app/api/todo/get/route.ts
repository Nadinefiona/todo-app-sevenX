import { asc } from 'drizzle-orm';
import { todo } from '../../../../../db/schema';
import db from '../../../../../db/drizzle';

export const getData = async () => {
  const data = await db.select().from(todo).orderBy(asc(todo.id));

  return data;
};
