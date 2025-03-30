import React from "react";
import { useTodoContext } from "../context/TodoContext";
import { THEME, useTheme } from "../context/ThemeProvider";

interface DoneItemProps {
  id: string;
  task: string;
}

const DoneItem: React.FC<DoneItemProps> = ({ id, task }) => {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  const { deleteTodo } = useTodoContext();

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
      <span style={{ textDecoration: "line-through" }}>{task}</span>
      <button
        onClick={() => deleteTodo(id)}
        style={{
          backgroundColor: isLightMode ? "red" : "#f87171", // 라이트: 빨강, 다크: 밝은 빨강
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "10px",
          cursor: "pointer",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = isLightMode
            ? "darkred"
            : "#ef4444";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = isLightMode
            ? "red"
            : "#f87171";
        }}
      >
        삭제
      </button>
    </li>
  );
};

export default DoneItem;