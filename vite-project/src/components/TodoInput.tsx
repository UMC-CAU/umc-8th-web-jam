import { useTodoContext } from "../context/TodoContext";
import { THEME, useTheme } from "../context/ThemeProvider";

const TodoInput = () => {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;
  const { todoInput, setTodoInput, addTodo } = useTodoContext();

  return (
    <div
      className="input-container"
      style={{
        display: "flex",
        marginBottom: "16px",
        justifyContent: "center",
      }}
    >
      <input
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        placeholder="설마 할 일이 또 있어요?"
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginRight: "5px",
          backgroundColor: isLightMode ? "white" : "#2d2d2d",
          color: isLightMode ? "black" : "white",
        }}
      />
      <button
        onClick={addTodo}
        style={{
          backgroundColor: isLightMode ? "darkslategray" : "#4ade80", 
          color: "white",
          borderRadius: "5px",
          padding: "10px",
          border: "none",
          cursor: "pointer",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = isLightMode
            ? "black"
            : "#22c55e"; // hover 색
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = isLightMode
            ? "darkslategray"
            : "#4ade80";
        }}
      >
        을(를) 해야합니다.
      </button>
    </div>
  );
};

export default TodoInput;