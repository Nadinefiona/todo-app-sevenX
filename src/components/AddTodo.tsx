"use client";
import { ChangeEvent, FC, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "@/actions/todoActions";

const AddTodo: FC = () => {
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAdd = () => {
    if (input.trim()) {
      mutation.mutate(input);
      setInput("");
    }
  };

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
