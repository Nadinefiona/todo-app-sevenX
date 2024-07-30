'use client';
import { FC } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import NavBar from './NavBar';
import { todoType } from '@/types/todoType';
import TodosHook from '../hooks/TodosHook';

const Todos: FC = () => {
  const { todos, isLoading, error } = TodosHook();

  // if (isLoading) return <div>Loading...</div>;
  if (error) {
    return <div>Error loading todos: {error.message}</div>;
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen flex justify-center bg-black text-white">
        <div className="w-full max-w-2xl p-8">
          <h1 className="text-5xl mb-12 text-center font-bold p-5 font-mono">
            ToDo App
          </h1>
          <div className="flex mb-4">
            <AddTodo />
          </div>
          <div>
            {todos?.map((todo: todoType) => <Todo key={todo.id} todo={todo} />)}
          </div>
        </div>
      </main>
    </>
  );
};

export default Todos;
