import React from "react";
import { useTodoContext } from "../context/TodoContext";

interface TodoItemProps {
  id: string;
  task: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, task }) => {
    const { doTodo } = useTodoContext();

    return (
        <li>
        <span>{task}</span>
        <button className="complete-btn" onClick={() => doTodo(id)}>
            완료
        </button>
        </li>
    );
};

export default TodoItem;