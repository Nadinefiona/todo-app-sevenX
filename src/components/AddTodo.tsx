"use client";
import { ChangeEvent, FC, useState } from "react";

interface Props {
  createTodo: (value: string) => void;
}

const AddTodo: FC<Props> = ({ createTodo }) => {
  const [input, setInput] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAdd = async () => {
    createTodo(input);
    setInput("");
  };

  return (
    <div className="w-full flex gap-1 mt-2 mb-2">
      <input
        type="text"
        className="flex-1 px-4 py-2 rounded-s border-b border-white bg-black text-white placeholder-gray-400"
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
