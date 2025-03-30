import DoneItem from "./DoneItem";
import { useTodoContext } from "../context/TodoContext";

const DoneList = () => {
    const { doneArray } = useTodoContext();

    return (
        <div className="done-box">
        <h3 className="list-title">한 일 😄</h3>
        <ul>
            {doneArray.map((todo) => (
            <DoneItem key={todo.id} id={todo.id} task={todo.task} />
            ))}
        </ul>
        </div>
    );
};

export default DoneList;