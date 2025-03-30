// App.tsx
import { useState } from "react";
import { Todo, TodoContext } from "./context/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import DoneList from "./components/DoneList";
import "./App.css";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { ThemeProvider, useTheme, THEME } from "./context/ThemeProvider";

const App = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todoArray, setTodoArray] = useState<Todo[]>([]);
  const [doneArray, setDoneArray] = useState<Todo[]>([]);

  const addTodo = () => {
    if (!todoInput.trim()) return;
    const newTodo: Todo = {
      id: new Date().toISOString(),
      task: todoInput,
      isDone: false,
    };
    setTodoArray([...todoArray, newTodo]);
    setTodoInput("");
  };

  const doTodo = (id: string) => {
    const index = todoArray.findIndex((todo) => todo.id === id);
    if (index === -1) return;
    const updatedTodo = { ...todoArray[index], isDone: true };
    const updatedTodoArray = [...todoArray];
    updatedTodoArray.splice(index, 1);
    setTodoArray(updatedTodoArray);
    setDoneArray([...doneArray, updatedTodo]);
  };

  const deleteTodo = (id: string) => {
    setDoneArray(doneArray.filter((todo) => todo.id !== id));
  };

  const todoContextValue = {
    todoArray,
    doneArray,
    todoInput,
    setTodoInput,
    addTodo,
    doTodo,
    deleteTodo,
  };

  return (
    <ThemeProvider>
      <TodoContext.Provider value={todoContextValue}>
        <AppInner />
      </TodoContext.Provider>
    </ThemeProvider>
  );
};

const AppInner = () => {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: isLightMode ? "lightgrey" : "#1e1e1e",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isLightMode ? "gray" : "#2e2e2e",
          flexDirection: "column",
          padding: "20px",
          width: "400px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          color: isLightMode ? "black" : "white",
        }}
      >
        <div style={{ fontSize: "xx-large", marginBottom: "16px" }}>📋 오늘 할 일</div>
        <TodoInput />
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            width: "100%",
            justifyContent: "space-around",
            paddingTop: "10px",
          }}
        >
          <TodoList />
          <DoneList />
        </div>
        <div style={{ marginTop: "16px" }}>
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  );
};

export default App;