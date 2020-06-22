import React, { useRef } from "react";
import { State, TodoItem } from "./TodoApp";

type Props = {
  state: State;
  setFilteredTodos: React.Dispatch<React.SetStateAction<TodoItem[] | null>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FunctionComponent<Props> = ({
  state,
  setFilteredTodos,
  setSearchQuery,
}) => {
  // const {state, setFilteredTodos, setSearchQuery} = props;
  const searchInput = useRef<HTMLInputElement>(null);

  let onSearchInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (searchInput.current === null) return;
    let text = searchInput.current.value;
    text = text.trim().toLowerCase();
    setSearchQuery(text);
    let filteredTodos: TodoItem[] | null = [];
    state.todos.forEach((ele) => {
      if (ele.text.toLowerCase().indexOf(text) !== -1) {
        filteredTodos!.push(ele);
      }
    });
    if (text === "") {
      filteredTodos = null;
      setFilteredTodos(null);
    } else {
      setFilteredTodos([...filteredTodos]);
    }
  };

  let resetSearch = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (searchInput.current === null) return;
    searchInput.current.value = "";
    setSearchQuery("");
    setFilteredTodos(null);
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        id="searchInput"
        ref={searchInput}
        onChange={onSearchInputChanged}
        placeholder="Search for a To-Do"
      />
      <i className="fas fa-times" id="close" onClick={resetSearch}></i>
    </div>
  );
};

export default SearchBar;
