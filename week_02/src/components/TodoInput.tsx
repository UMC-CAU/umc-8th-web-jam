import React from "react";

interface TodoInputProps {
    value: string;
    onChange: (value: string) => void;
    onAdd: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ value, onChange, onAdd }) => {
    return (
        <div className="input-container">
            <input
                className="todo-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="설마 할 일이 또 있나요?"
            />
            <button className="add-btn" onClick={onAdd}>
                을/를 해야 합니다.
            </button>
        </div>
    );
};

export default TodoInput;