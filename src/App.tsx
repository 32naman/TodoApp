import React, { useState } from "react";
import Login from "./components/Login";
import TodoApp from "./components/TodoApp";
import SharedTodo from "./components/SharedTodo";
import ScreenShareAgent from "./components/ScreenShareAgent";
import { BrowserRouter, Route, RouteComponentProps } from "react-router-dom";

function App(props: {}) {
  const [id_token, setID] = useState("");
  const state = {
    id_token: id_token,
  };

  let updateState = (id_token: string) => {
    console.log(id_token);
    setID(id_token);
  };

  return (
    <BrowserRouter forceRefresh={true}>
      <div className="App">
        <Route
          path="/login"
          render={(props: {}) => (
            <Login {...props} state={state} updateState={updateState} />
          )}
        ></Route>
        <Route
          path="/todos"
          render={(props: RouteComponentProps) => <TodoApp {...props} />}
        ></Route>
        <Route
          path="/share"
          render={(props: {}) => <SharedTodo {...props} state={state} />}
        ></Route>
        {/* <Route
          path="/screen"
          render={(props: {}) => <ScreenShareAgent {...props} />}
        ></Route> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
