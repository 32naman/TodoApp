import React from "react";
import netCalls from "../netCallsShare";
import { State, TodoItem } from "./interfaces";
// const PORT = 8000;
const sharePOSTURL = `https://todonaman1.herokuapp.com/sharePOST`;

type Props = {
  state: State;
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
};

type PropsUI = {
  state: State;
  tickOrDelete: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

function TodoList(props: Props) {
  let tickOrDelete = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const btn = event.target as HTMLElement;
    let todos = props.state.todos;

    const item = btn.parentElement;
    let ind: number = 0;
    if (item != null) {
      const todoText = item.querySelector(".text") as HTMLParagraphElement;
      if (todoText != null)
        ind = todos.findIndex((ele) => ele.text === todoText.innerText);
      console.log(ind);
    }
    // Tick Case
    if (btn.id === "tick") {
      todos[ind].done = !todos[ind].done;

      props.setTodos([...todos]);
      netCalls.putJSON(sharePOSTURL, todos, props.state.hash);
    }
    // Delete Case
    else if (btn.id === "delete") {
      // item.remove();
      todos.splice(ind, 1);

      props.setTodos([...todos]);
      netCalls.putJSON(sharePOSTURL, todos, props.state.hash);
    }
  };

  return (
    <div className="todo">
      <TodoListUI state={props.state} tickOrDelete={tickOrDelete} />
    </div>
  );
}

const TodoListUI = (props: PropsUI) => {
  const { state, tickOrDelete } = props;
  let todos = state.filteredTodos ?? state.todos;
  let todoList = todos.map((todo) => {
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
