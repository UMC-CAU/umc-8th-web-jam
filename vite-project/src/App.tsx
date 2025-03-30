import { useState } from "react";
import { Todo, TodoContext } from "./context/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import DoneList from "./components/DoneList";
import "./App.css";


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
    setTodoArray([...todoArray, newTodo]); // 
    setTodoInput(""); // 입력창 비우기 위해서
  };

  const doTodo = (id: string) => {
    const index = todoArray.findIndex((todo) => todo.id === id);
    if (index === -1) return;

    const updatedTodo = { ...todoArray[index], isDone: true };
    const updatedTodoArray = [...todoArray];
    updatedTodoArray.splice(index, 1); 

    setTodoArray(updatedTodoArray); // 한 일이 제거된 새 할 일 배열
    setDoneArray([...doneArray, updatedTodo]); // 한 일에 요소 추가
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


  // App.tsx에 Provider 사용
  return (
    <TodoContext.Provider value={todoContextValue}> 
      <div className="container">
        <div className="title-container">📋 오늘 할 일</div>
        <TodoInput />
        <div className="list-container">
          <TodoList />
          <DoneList />
        </div>
      </div>
    </TodoContext.Provider>
  );
};

export default App;