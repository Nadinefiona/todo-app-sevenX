"use client";
import { FC, useState } from "react";
import { todoType } from "@/types/todoType";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { deleteTodo } from "@/app/api/todo/delete/route";
import { toggleTodo } from "@/app/api/todo/Toogletodo/route";
import { editTodo } from "@/app/api/todo/edit/route";
import { addTodo } from "@/app/api/todo/add/route";

interface Props {
  todos: todoType[];
}

const Todos: FC<Props> = ({ todos }) => {
  const [todoItems, setTodoItems] = useState<todoType[]>(todos);

  const createTodo = (text: string) => {
    const id = (todoItems.at(-1)?.id || 0) + 1;
    addTodo(text);
    setTodoItems((prev) => [...prev, { id: id, text, done: false }]);
  };

  const changeTodoText = (id: number, text: string) => {
    setTodoItems((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
    editTodo(id, text);
  };

  const toggleIsTodoDone = (id: number) => {
    setTodoItems((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
    toggleTodo(id);
  };

  const deleteTodoItem = (id: number) => {
    setTodoItems((prev) => prev.filter((todo) => todo.id !== id));
    deleteTodo(id);
  };

  return (
    <main className="min-h-screen flex justify-center bg-black text-white">
      <div className="w-full max-w-2xl	p-8">
        <h1 className="text-4xl mb-12 text-center font-bold	p-5">ToDo App</h1>
        <div className="flex mb-4">
          <AddTodo createTodo={createTodo} />
        </div>
        <div>
          {todoItems.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              changeTodoText={changeTodoText}
              toggleIsTodoDone={toggleIsTodoDone}
              deleteTodoItem={deleteTodoItem}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Todos;
