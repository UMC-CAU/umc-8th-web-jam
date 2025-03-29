import React from "react";
import TodoItem from "./TodoItem";

interface Todo {
  id: string;
  task: string;
  isDone: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onComplete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onComplete }) => {
  return (
    <div className="todo-box">
      <h3 className="list-title">할 일 😭</h3>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} id={todo.id} task={todo.task} onComplete={onComplete} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;