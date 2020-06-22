import React from "react";
import netCalls from "../netCallsMod";
import { State, TodoItem } from "./TodoApp";

const PORT = 8000;
const putURL = `https://todonaman1.herokuapp.com/postdata`;

type Props = {
  state: State;
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
};

type PropsUI = {
  state: State;
  tickOrDelete: (event: any) => void;
};

const TodoList: React.FunctionComponent<Props> = ({ state, setTodos }) => {
  let tickOrDelete = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    let btn: HTMLElement;
    if (event.target instanceof HTMLElement) btn = event.target;
    else return;
    let todos = state.todos;

    const item = btn.parentElement;
    if (item === null) return;
    const todoText = item.querySelector(".text") as HTMLElement;
    let ind = todos.findIndex((ele) => ele.text === todoText.innerText);
    // Tick Case
    if (btn.id === "tick") {
      todos[ind].done = !todos[ind].done;
    }
    // Delete Case
    else if (btn.id === "delete") {
      // item.remove();
      todos.splice(ind, 1);
    }

    setTodos([...todos]);
    netCalls.putJSON(putURL, state.listNum, todos, state.id_token);
  };

  return (
    <div className="todo">
      <TodoListUI state={state} tickOrDelete={tickOrDelete} />
    </div>
  );
};

const TodoListUI: React.FunctionComponent<PropsUI> = ({
  state,
  tickOrDelete,
}) => {
  // const { state, tickOrDelete } = props;
  let Todos = state.filteredTodos ?? state.todos;
  let todoList = Todos.map((todo) => {
    let doneTodo = todo.done ? "text lineThrough" : "text";
    return (
      <li className="item" key={todo.id}>
        <p className={doneTodo}>{todo.text}</p>
        <i className="fas fa-check tick" id="tick" onClick={tickOrDelete}></i>
        <i
          className="fas fa-trash delete"
          id="delete"
          onClick={tickOrDelete}
        ></i>
      </li>
    );
  });
  return <ul id="list">{todoList}</ul>;
};

export default TodoList;
