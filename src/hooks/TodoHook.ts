'use client';

import { ChangeEvent, FC, useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo, toggleTodo, editTodo } from '@/actions/todoActions';
import { todoType } from "@/types/todoType";

interface Props {
    todo: todoType;
  }

const TodoHooks = (todo: todoType) => {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(todo.text);
    const [isDone, setIsDone] = useState(todo.done);
  
    const queryClient = useQueryClient();
  
    const deleteMutation = useMutation({
      mutationFn: deleteTodo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
      },
    });
  
    const toggleMutation = useMutation({
      mutationFn: toggleTodo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
      },
    });
  
    const editMutation = useMutation({
      mutationFn: editTodo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
      },
    });
  
    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    };
  
    const handleIsDone = () => {
      console.log("Before toggle: ", isDone);
      toggleMutation.mutate(
        { id: todo.id, done: !isDone },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
          },
          onError: (error) => {
            console.error("Toggle mutation error: ", error);
          },
        }
      );
      setIsDone((prev) => !prev);
    };
  
    const handleEdit = () => {
      setEditing(true);
    };
  
    const handleSave = () => {
      if (text.trim()) {
        editMutation.mutate({ id: todo.id, text });
        setEditing(false);
      }
    };
  
    const handleCancel = () => {
      setEditing(false);
      setText(todo.text);
    };
  
    const handleDelete = () => {
      deleteMutation.mutate(todo.id);
    };

    return {
        isDone,
        text,
        editing,
        handleTextChange,
        handleIsDone,
        handleEdit,
        handleSave,
        handleCancel,
        handleDelete
    }

}

export default TodoHooks;