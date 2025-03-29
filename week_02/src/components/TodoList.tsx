import React from "react";
import TodoItem from "./TodoItem";
import { useTodoContext } from "../context/TodoContext";

const TodoList = () => {
    const { todoArray } = useTodoContext();

    return (
        <div className="todo-box">
        <h3 className="list-title">할 일 😭</h3>
        <ul>
            {todoArray.map((todo) => (
            <TodoItem key={todo.id} id={todo.id} task={todo.task} />
            ))}
        </ul>
        </div>
    );
};

export default TodoList;