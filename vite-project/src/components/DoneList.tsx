import DoneItem from "./DoneItem";
import { useTodoContext } from "../context/TodoContext";
import { THEME, useTheme } from "../context/ThemeProvider";

const DoneList = () => {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;
  const { doneArray } = useTodoContext();

  return (
    <div
      className="done-box"
      style={{
        backgroundColor: isLightMode ? "gray" : "rgb(46, 46, 46)", 
        color: isLightMode ? "black" : "white",
        borderRadius: "10px",
        padding: "10px",
        width: "100%",
      }}
    >
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