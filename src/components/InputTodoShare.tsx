import React, { useState, useEffect, useRef } from "react";
import netCalls from "../netCallsShare";
import { TodoItem, State } from "./interfaces";
// const PORT = 8000;
const sharePOSTURL = `https://todonaman1.herokuapp.com/sharePOST`;

interface Props {
  state: State;
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

function useNewTodo(props: Props) {
  const [newTodo, setNewTodo] = useState("");
  const { state, setTodos } = props;
  useEffect(() => {
    if (newTodo !== "") {
      let todosSend: TodoItem[] = [];
      setTodos((todos) => {
        todos.push({ text: newTodo.trim(), done: false, id: Math.random() });
        todosSend = todos;
        return [...todos];
      });

      netCalls.putJSON(sharePOSTURL, todosSend, state.hash);
    }
  }, [newTodo, setTodos, state.hash]);

  return setNewTodo;
}

function InputTodo(props: Props) {
  const setNewTodo = useNewTodo(props);
  const inputNewTodo = useRef<HTMLInputElement>(null);

  function addTodo() {
    const text = inputNewTodo.current!.value;
    setNewTodo(text);
    inputNewTodo.current!.value = "";
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
}

export default InputTodo;
