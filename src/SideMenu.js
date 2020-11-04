import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/SideMenu.css";
import { connect } from "react-redux";
import { authService } from "./fbase";

const SideMenu = ({ dispatch, reducerMenu, reducerLog }) => {
  const clickOffMenu = () => {
    dispatch({ type: "onSideMenu", payload: reducerMenu });
  };

  const clickLogOut = (event) => {
    event.preventDefault();
    dispatch({ type: "onSideMenu", payload: reducerMenu });
    dispatch({ type: "isLoggedIn", payload: reducerLog });
    authService.signOut();
  };

  //
  //
  //

  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEamil(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await authService.signInWithEmailAndPassword(email, password);
      dispatch({ type: "isLoggedIn", payload: reducerLog });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div id="sideMenuDiv">
      <div id="smSpace" onClick={clickOffMenu}></div>
      <div id="sideMenu">
        {reducerLog ? (
          <>
            <div id="menuTop">
              <span>내 정보</span>
              <input
                id="logOutBtn"
                type="submit"
                value="로그아웃"
                onClick={clickLogOut}
              ></input>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={onSubmit}>
              <input
                className="inputAcc"
                onChange={onChange}
                value={email}
                name="email"
                type="email"
                placeholder="이메일"
              ></input>
              <input
                className="inputAcc"
                onChange={onChange}
                value={password}
                name="password"
                type="password"
                placeholder="패스워드"
              ></input>
              <input id="accSubmit" type="submit" value="로그인"></input>
            </form>
            <br></br>
            <Link id="linkSignUp" to="/SignUp" onClick={clickOffMenu}>
              가입하기
            </Link>
          </>
        )}
        <div>
          <Link to="/FreeChat" onClick={clickOffMenu}>
            채팅방
          </Link>
        </div>
      </div>
    </div>
  );
};

const getStore = ({ reducerMenu, reducerLog }) => {
  return {
    reducerMenu,
    reducerLog,
  };
};

export default connect(getStore)(SideMenu);
