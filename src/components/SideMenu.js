import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/SideMenu.css";
import { connect } from "react-redux";
import { authService } from "../fbase";
import Footer from "./Footer";

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
              {/* <span id="myProfile">내 정보</span> */}
              <Link id="myProfile" to="/MyProfile" onClick={clickOffMenu}>
                내 정보
              </Link>
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
            <Link id="linkSignUp" to="/SignUp" onClick={clickOffMenu}>
              가입하기
            </Link>
          </>
        )}
        <div id="sideMenuBody">
          <Link
            className="sideMenuBtn"
            to="/SearchPlace"
            onClick={clickOffMenu}
          >
            내 주변 동물병원
          </Link>
          <Link className="sideMenuBtn" to="/FreeChat" onClick={clickOffMenu}>
            채팅방
          </Link>
          <Link className="sideMenuBtn" to="/" onClick={clickOffMenu}>
            메뉴3
          </Link>
          <Link className="sideMenuBtn" to="/" onClick={clickOffMenu}>
            메뉴4
          </Link>
          <Link className="sideMenuBtn" to="/" onClick={clickOffMenu}>
            메뉴5
          </Link>
        </div>
        <Footer />
      </div>
      {/*  */}
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
