'use client';

import AddTodoHooks from '@/hooks/AddTodoHook';
import { FC } from 'react';

const AddTodo: FC = () => {
  const { input, handleInput, handleAdd } = AddTodoHooks();

  return (
    <div className="w-full flex gap-1 mt-2">
      <input
        type="text"
        className="flex-1 px-4 py-2 rounded-l border-b  dark:border-white border-black bg-white dark:bg-black text-white dark:placeholder-gray-400 placeholder:brown-400"
        placeholder="Add ToDos....."
        onChange={handleInput}
        value={input}
      />
      <div
        className="px-4 py-2 bg-black dark:bg-white dark:text-black text-white rounded-r cursor-pointer"
        onClick={handleAdd}
      >
        Add
      </div>
    </div>
  );
};

export default AddTodo;
