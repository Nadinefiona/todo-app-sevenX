import {pgTable, serial,text, timestamp, uniqueIndex, boolean} from "drizzle-orm/pg-core";

export const todo = pgTable(
  "todo",
  {
    id: serial("id").primaryKey(),
    text: text("text").notNull(),
    done: boolean("done").default(false).notNull(),
    createdAt: timestamp("createdAt").defaultNow()

  },
  (todo) => {
    return {
      uniqueIndex: uniqueIndex("unique_idx").on(todo.text)
    };
  }
);
