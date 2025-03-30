import { useTodoContext } from "../context/TodoContext";

const TodoInput = () => {
    const { todoInput, setTodoInput, addTodo } = useTodoContext();

    return (
        <div className="input-container">
        <input
            className="todo-input"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            placeholder="설마 할 일이 또 있어요?"
        />
        <button className="add-btn" onClick={addTodo}>
            을(를) 해야합니다.
        </button>
        </div>
    );
};

export default TodoInput;