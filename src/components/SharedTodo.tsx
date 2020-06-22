import React, { useState, useEffect } from "react";
import netCalls from "../netCallsShare";
import SearchBar from "./SearchBar";
import TodoList from "./TodoListShare";
import InputTodo from "./InputTodoShare";
import "./TodoApp.css";
import { State, TodoItem } from "./interfaces";
// const PORT = 8000;
const getURL = `https://todonaman1.herokuapp.com/getdata`;
const shareSocketURL = `wss://todonaman1.herokuapp.com/shareSocket`;
interface Data {
  [Key: string]: string | undefined;
}

function SharedTodo(props: {
  state: {
    id_token: string;
  };
}) {
  const url = new URL(document.URL);
  const search_params = url.searchParams;
  const hash_val = search_params.get("hash");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  let [filteredTodos, setFilteredTodos] = useState<TodoItem[] | null>(null);
  const [date] = useState(
    new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      weekday: "short",
    })
  );
  const [hash] = useState(hash_val);
  const [, setSocket] = useState<WebSocket>(new WebSocket(shareSocketURL));
  const state: State = {
    todos: todos,
    searchQuery: searchQuery,
    filteredTodos: filteredTodos,
    date: date,
    hash: hash,
    listNum: 1,
    totalLists: 1,
    id_token: null,
    sharing: "off",
  };

  // let updateState = (stateData:State) => {
  //     if(stateData.todos) setTodos([...stateData.todos]);
  //     if(stateData.searchQuery) setSearchQuery(stateData.searchQuery);
  //     if(stateData.filteredTodos !== undefined){
  //         if(stateData.filteredTodos === null) setFilteredTodos(null);
  //         else setFilteredTodos([...stateData.filteredTodos]);
  //     }
  //     if(stateData.date) setDate(stateData.date);
  //     if(stateData.hash) setHash(stateData.hash);
  // }

  useEffect(() => {
    console.log("here Mount");
    // this.onLoad();
    let startSocket = new WebSocket(shareSocketURL);
    setSocket(startSocket);

    console.log("initial load");
    let todos: TodoItem[] = [];
    netCalls.getJSON(
      getURL,
      (err: number | null, data: object) => {
        if (err !== null) {
          console.log("Empty");
          setTodos([...todos]);
        } else {
          console.log("Loaded");
          console.log(data);
          let dataWithKey = data as Data;
          if (dataWithKey["json"] !== undefined)
            setTodos(JSON.parse(dataWithKey["json"]));
        }
      },
      hash,
      startSocket
    );

    startSocket.onmessage = (event) => {
      console.log(event.data);
      let data = JSON.parse(event.data);
      setTodos([...data]);
    };
  }, [hash]);

  return (
    <div className="container">
      <div className="header">
        <div className="date">{date}</div>
        <SearchBar
          state={state}
          setFilteredTodos={setFilteredTodos}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <TodoList state={state} setTodos={setTodos} />
      <InputTodo state={state} setTodos={setTodos} />
    </div>
  );
}

export default SharedTodo;
