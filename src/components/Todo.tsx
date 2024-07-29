"use client";
import { ChangeEvent, FC, useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoType } from "@/types/todoType";
import { deleteTodo, toggleTodo, editTodo } from '@/actions/todoActions';

interface Props {
  todo: todoType;
}

const Todo: FC<Props> = ({ todo }) => {
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

  return (
    <div className="flex items-center gap-1 p-4 border-gray-200 border-solid border rounded-lg bg-black text-white mb-2">
      <input
        type="checkbox"
        className="text-blue-200 rounded-sm h-4 w-4"
        checked={isDone}
        onChange={handleIsDone}
      />
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        readOnly={!editing}
        className={`outline-none flex-1 px-4 py-2 rounded-l border-white bg-black text-white ${
          todo.done ? "line-through" : ""
        }`}
      />
      <div className="flex gap-1 ml-auto">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white rounded px-2 py-2"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-600 text-white rounded px-2 py-2"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-white rounded px-2 py-1"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white rounded px-2 py-2"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;
