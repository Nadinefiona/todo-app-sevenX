"use client";

import { ChangeEvent, FC, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "@/actions/todoActions";


 const AddTodoHooks = () => {
    
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
    }

  return{
    input,
    handleInput,
    handleAdd
  }
};

export default AddTodoHooks;



