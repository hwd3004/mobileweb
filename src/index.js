import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { combineReducers, createStore } from "redux";

const isLoggedIn = false;

const reducerLog = (state = isLoggedIn, action) => {
  if (action.type === "isLoggedIn") {
    if (action.payload === true) {
      return false;
    } else if (action.payload === false) {
      return true;
    }
  } else {
    return state;
  }
};

//

const sideMenuSwitch = false;

const reducerSMS = (state = sideMenuSwitch, action) => {
  if (action.type === "onSideMenu") {
    if (action.payload === true) {
      return false;
    } else if (action.payload === false) {
      return true;
    }
  } else {
    return state;
  }
};

const store = createStore(combineReducers({ reducerSMS, reducerLog }));

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById("root")
);
