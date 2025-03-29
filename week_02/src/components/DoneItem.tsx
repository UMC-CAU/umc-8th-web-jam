import React from "react";

interface DoneItemProps {
  id: string;
  task: string;
  onDelete: (id: string) => void;
}

const DoneItem: React.FC<DoneItemProps> = ({ id, task, onDelete }) => {
  return (
    <li>
      <span style={{ textDecoration: "line-through" }}>{task}</span>
      <button className="delete-btn" onClick={() => onDelete(id)}>
        삭제
      </button>
    </li>
  );
};

export default DoneItem;