import React from "react";
import DoneItem from "./DoneItem";

interface Todo {
  id: string;
  task: string;
  isDone: boolean;
}

interface DoneListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
}

const DoneList: React.FC<DoneListProps> = ({ todos, onDelete }) => {
  return (
    <div className="done-box">
      <h3 className="list-title">한 일 😄</h3>
      <ul>
        {todos.map((todo) => (
          <DoneItem key={todo.id} id={todo.id} task={todo.task} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
};

export default DoneList;