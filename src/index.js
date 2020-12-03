import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import { combineReducers, createStore } from "redux";

const reducerNickname = (state = null, { type, payload }) => {
  if (type === "nickname") {
    return payload;
  } else {
    return state;
  }
};

//
//
//

const isLoggedIn = false;

const reducerLog = (state = isLoggedIn, action) => {
  if (action.type === "isLoggedIn") {
    return !state;
  } else {
    return state;
  }
};

//
//
//

const sideMenuSwitch = false;

const reducerMenu = (state = sideMenuSwitch, action) => {
  if (action.type === "onSideMenu") {
    return !state;
  } else {
    return state;
  }
};

//
//
//

const store = createStore(
  combineReducers({ reducerMenu, reducerLog, reducerNickname })
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
