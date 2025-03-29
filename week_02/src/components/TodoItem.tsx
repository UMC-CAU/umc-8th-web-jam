import React from "react";

interface TodoItemProps {
  id: string;
  task: string;
  onComplete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, task, onComplete }) => {
  return (
    <li>
      <span>{task}</span>
      <button className="complete-btn" onClick={() => onComplete(id)}>
        완료
      </button>
    </li>
  );
};

export default TodoItem;