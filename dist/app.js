"use strict";
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
let todoArray = [];
let doneArray = [];
const addTodo = () => {
    alert("또 할 일이야...");
    const newTodo = {
        id: new Date().toTimeString(),
        task: todoInput.value,
        isDone: false
    };
    todoArray.push(newTodo);
    renderTodos();
    renderDoneTodos();
};
const doTodo = (todoId) => {
    alert("야호 하나 해치웠다!");
    const index = todoArray.findIndex(todo => todo.id === todoId);
    if (index === -1)
        return;
    const completedTodo = todoArray.splice(index, 1)[0];
    if (!completedTodo)
        return;
    completedTodo.isDone = true;
    doneArray.push(completedTodo);
    renderTodos();
    renderDoneTodos();
};
const deleteTodo = (todoId) => {
    const index = doneArray.findIndex(todo => todo.id === todoId);
    if (index === -1)
        return;
    doneArray.splice(index, 1);
    renderTodos();
    renderDoneTodos();
};
const renderTodos = () => {
    todoList.innerHTML = "";
    todoArray.forEach(todo => {
        const li = document.createElement("li");
        const taskText = document.createElement("span");
        taskText.textContent = todo.task;
        const completeButton = document.createElement("button");
        completeButton.textContent = "완료";
        completeButton.classList.add("complete-btn");
        completeButton.addEventListener("click", () => doTodo(todo.id));
        li.appendChild(taskText);
        li.appendChild(completeButton);
        todoList.appendChild(li);
    });
};
const renderDoneTodos = () => {
    doneList.innerHTML = "";
    doneArray.forEach(todo => {
        const li = document.createElement("li");
        const taskText = document.createElement("span");
        taskText.textContent = todo.task;
        taskText.style.textDecoration = "line-through";
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", () => deleteTodo(todo.id));
        li.appendChild(taskText);
        li.appendChild(deleteButton);
        doneList.appendChild(li);
    });
};
addButton.addEventListener("click", addTodo);
