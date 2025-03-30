import React, { createContext, useContext } from "react";

export interface Todo {
  id: string;
  task: string;
  isDone: boolean;
}

interface TodoContextType {
  todoArray: Todo[];
  doneArray: Todo[];
  todoInput: string;
  setTodoInput: (value: string) => void;
  addTodo: () => void;
  doTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const TodoContext = createContext<TodoContextType | null>(null);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("TodoContext not found");
  return context;
};