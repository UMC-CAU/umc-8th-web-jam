import React, { useState } from "react";
import "./App.css";

interface Todo {
  id: string;
  task: string;
  isDone: boolean;
};

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

  return (
    <div className="container">
      <div className="title-container">📋 오늘 할 일</div>
      <div className="input-container">
        <input
          id="todo-input"
          type="text"
          placeholder="설마 할 일이 또 있나요?"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)} 
          // onChange는 입력값이 바뀔 때마다 실행되는 이벤트 핸들러
          // 사용자가 입력 → onChange 발생 → 상태 변경 → 입력창에 반영
          // React에서는 input을 직접 제어하지 않고, state를 통해 통제
        />
        <button id="add-btn" onClick={addTodo}>
          을(를) 해야합니다.
        </button>
      </div>

      <div className="list-container">
        <div className="todo-box">
          <h3 className="list-title">할 일 😭</h3>
          <ul id="todo-list">
            {todoArray.map((todo) => (
              <li key={todo.id}>
                <span>{todo.task}</span>
                <button className="complete-btn" onClick={() => doTodo(todo.id)}>
                  완료
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="done-box">
          <h3 className="list-title">한 일 😄</h3>
          <ul id="done-list">
            {doneArray.map((todo) => (
              <li key={todo.id}>
                <span style={{ textDecoration: "line-through" }}>{todo.task}</span>
                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;