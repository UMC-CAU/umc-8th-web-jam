import React from "react";
import { useTodoContext } from "../context/TodoContext";

interface DoneItemProps {
  id: string;
  task: string;
}

const DoneItem: React.FC<DoneItemProps> = ({ id, task }) => {
    const { deleteTodo } = useTodoContext();

    return (
        <li>
        <span style={{ textDecoration: "line-through" }}>{task}</span>
        <button className="delete-btn" onClick={() => deleteTodo(id)}>
            삭제
        </button>
        </li>
    );
};

export default DoneItem;