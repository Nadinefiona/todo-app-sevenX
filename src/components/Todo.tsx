"use client";
import { FC } from "react";
import { todoType } from "@/types/todoType";
import TodoHooks from "@/hooks/TodoHook";


interface Props {
  todo: todoType;
}

const Todo: FC<Props> = ({ todo }) => {

  const {
    isDone,
    text, 
    editing,
    handleTextChange,
    handleIsDone,
    handleEdit,
    handleSave,
    handleCancel,
    handleDelete
  } = TodoHooks(todo);


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
