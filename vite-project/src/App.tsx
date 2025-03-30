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

  return (
    <div className={theme === THEME.DARK ? "dark" : ""}>
      <div className="container bg-white dark:bg-gray-800 dark:text-white">
        <div className="title-container">📋 오늘 할 일</div>
        <TodoInput />
        <div className="list-container">
          <TodoList />
          <DoneList />
        </div>
        <ThemeToggleButton />
      </div>
    </div>
  );
};

export default App;