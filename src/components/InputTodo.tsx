import React, { useRef } from "react";
import netCalls from "../netCallsMod";
import { State, TodoItem } from "./TodoApp";

// const PORT = 8000;
const putURL = `https://todonaman1.herokuapp.com/postdata`;

type Props = {
  state: State;
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
};

const InputTodo: React.FunctionComponent<Props> = ({ state, setTodos }) => {
  const inputNewTodo = useRef<HTMLInputElement>(null);

  function addTodo(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (inputNewTodo.current === null) return;
    let text = inputNewTodo.current.value;
    let todosSend: TodoItem[] = state.todos;
    todosSend.push({ text: text.trim(), done: false, id: Math.random() });
    setTodos([...todosSend]);
    console.log(todosSend);
    netCalls.putJSON(putURL, state.listNum, todosSend, state.id_token);
    inputNewTodo.current.value = "";
  }

  return (
    <div className="inputToDo">
      <input
        type="text"
        id="input"
        ref={inputNewTodo}
        placeholder="Enter a To-Do"
      />
      <i className="fas fa-plus-square" onClick={addTodo}></i>
    </div>
  );
};

export default InputTodo;
