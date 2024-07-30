"use client";

import AddTodoHooks from "@/hooks/AddTodoHook";
import { FC } from "react";

const AddTodo: FC = () => {
  const { input, handleInput, handleAdd} = AddTodoHooks();

  return (
    <div className="w-full flex gap-1 mt-2">
      <input
        type="text"
        className="flex-1 px-4 py-2 rounded-l border-b border-white bg-black text-white placeholder-gray-400"
        placeholder="Add ToDos....."
        onChange={handleInput}
        value={input}
      />
      <div
        className="px-4 py-2 bg-white text-black rounded-r cursor-pointer"
        onClick={handleAdd}
      >
        Add
      </div>
    </div>
  );
};

export default AddTodo;
