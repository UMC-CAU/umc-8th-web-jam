const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const addButton = document.getElementById("add-btn") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

interface Todo {
    id: string;
    task: string;
    isDone: boolean;
}

let todoArray: Todo[] = [];
let doneArray: Todo[] = [];

const addTodo = (): void => {
    alert("또 할 일이야...");
    const newTodo: Todo = {
        id: new Date().toTimeString(),
        task: todoInput.value,
        isDone: false
    };
    todoArray.push(newTodo);
    renderTodos();
    renderDoneTodos();
}

const doTodo = (todoId: string):void => {
    alert("야호 하나 해치웠다!");
    const index = todoArray.findIndex(todo => todo.id ===todoId);
    if (index === -1) return; // 해당 ID가 없으면 함수 종료 -> typescript라 이 과정이 없으면 실행 불가

    const completedTodo = todoArray.splice(index, 1)[0];
    if (!completedTodo) return; // undefined인 경우 실행하지 않음

    completedTodo.isDone = true;
    doneArray.push(completedTodo);
    renderTodos();
    renderDoneTodos();
}

const deleteTodo = (todoId: string): void => {
    const index = doneArray.findIndex(todo => todo.id === todoId);
    if (index === -1) return; // 해당 ID가 없으면 종료

    doneArray.splice(index, 1); 

    renderTodos();
    renderDoneTodos();
};


const renderTodos = (): void => {
    todoList.innerHTML = "";

    todoArray.forEach(todo => {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = todo.task;

        // 완료 버튼 생성
        const completeButton = document.createElement("button");
        completeButton.textContent = "완료";
        completeButton.classList.add("complete-btn");
        completeButton.addEventListener("click", () => doTodo(todo.id));

        li.appendChild(taskText);
        li.appendChild(completeButton); // 버튼 추가
        todoList.appendChild(li);

    })
}

const renderDoneTodos = (): void => {
    doneList.innerHTML = ""; // 기존 완료 리스트 초기화

    doneArray.forEach(todo => {
        const li = document.createElement("li");

        // 완료된 할 일 텍스트
        const taskText = document.createElement("span");
        taskText.textContent = todo.task;
        taskText.style.textDecoration = "line-through"; // 완료 표시

        // 삭제 버튼 생성
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