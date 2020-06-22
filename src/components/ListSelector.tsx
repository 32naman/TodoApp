import React, { useEffect, useRef } from "react";
import netCalls from "../netCallsMod";
import { State, TodoItem } from "./TodoApp";

// const PORT = 8000;
const getURL = `https://todonaman1.herokuapp.com/getdata`;

type Props = {
  state: State;
  updateState: (stateData: Partial<State>) => void;
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
};

type PropsUI = {
  state: State;
  getList: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  addNewList: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  lists: React.RefObject<HTMLSelectElement>;
};

const ListSelector: React.FunctionComponent<Props> = ({
  state,
  updateState,
  setTodos,
}) => {
  const lists = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    let todos = [];
    netCalls.getJSON(
      getURL,
      state.listNum,
      (err: number | null, data: object) => {
        if (err !== null) {
          console.log("Empty");
          // updateState({todos: todos});
          setTodos([...todos]);
        } else {
          console.log("Loaded");
          console.log(data);
          todos = JSON.parse(data["json"]);
          // updateState({todos: todos});
          setTodos([...todos]);
        }
      },
      state.id_token
    );
    if (lists.current !== null) lists.current.selectedIndex = state.listNum - 1;
  }, [state.listNum, state.id_token, setTodos]);

  let getList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("onChange");
    if (lists.current === null) return;
    let listNum = Number(lists.current.selectedIndex + 1);
    if (listNum === 0) return;
    console.log(listNum);
    updateState({ listNum: listNum });
  };

  let addNewList = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    let totalLists = state.totalLists + 1;
    updateState({ totalLists: totalLists });
    console.log(totalLists);
    updateState({ listNum: totalLists });
  };

  return (
    <ListSelectorUI
      state={state}
      getList={getList}
      addNewList={addNewList}
      lists={lists}
    />
  );
};

const ListSelectorUI: React.FunctionComponent<PropsUI> = ({
  state,
  getList,
  addNewList,
  lists,
}) => {
  //   const { state, getList, addNewList, lists } = props;
  let optionsList: JSX.Element[] = [];
  for (let i = 1; i <= state.totalLists; i++) {
    optionsList.push(
      <option value={i.toString()}>{"List" + i.toString()}</option>
    );
  }
  return (
    <div className="multipleLists">
      <select id="lists" ref={lists} onChange={getList}>
        {optionsList}
      </select>
      <i className="fas fa-list" id="addList" onClick={addNewList}></i>
    </div>
  );
};

export default ListSelector;
