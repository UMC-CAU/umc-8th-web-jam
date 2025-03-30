import TodoItem from "./TodoItem";
import { useTodoContext } from "../context/TodoContext";
import { THEME, useTheme } from "../context/ThemeProvider";

const TodoList = () => {
  const { todoArray } = useTodoContext();
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <div
      className="todo-box"
      style={{
        backgroundColor: isLightMode ? "gray" : "rgb(46, 46, 46)", 
        color: isLightMode ? "black" : "white",
        borderRadius: "10px",
        padding: "10px",
        width: "100%",
      }}
    >
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