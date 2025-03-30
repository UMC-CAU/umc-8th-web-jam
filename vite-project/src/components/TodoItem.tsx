import React from "react";
import { useTodoContext } from "../context/TodoContext";
import { THEME, useTheme } from "../context/ThemeProvider";

interface TodoItemProps {
  id: string;
  task: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, task }) => {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;
  const { doTodo } = useTodoContext();

  return (
    <li
      style={{
        backgroundColor: isLightMode ? "white" : "darkgray", 
        color: isLightMode ? "black" : "white",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",
      }}
    >
      <span>{task}</span>
      <button
        onClick={() => doTodo(id)}
        style={{
          backgroundColor: isLightMode ? "green" : "#22c55e", 
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "10px",
          cursor: "pointer",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = isLightMode
            ? "darkgreen"
            : "#16a34a"; // hover 시 색상 변경
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = isLightMode
            ? "green"
            : "#22c55e";
        }}
      >
        완료
      </button>
    </li>
  );
};

export default TodoItem;