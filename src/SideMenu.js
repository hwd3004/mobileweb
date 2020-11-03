import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/SideMenu.css";
import { connect } from "react-redux";
import { authService } from "./fbase";

const SideMenu = (props) => {
  const clickOffMenu = () => {
    props.dispatch({ type: "onSideMenu", payload: props.state.reducerSMS });
  };

  const clickLogOut = (event) => {
    event.preventDefault();
    props.dispatch({ type: "onSideMenu", payload: props.state.reducerSMS });
    props.dispatch({ type: "isLoggedIn", payload: props.state.reducerLog });
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
      props.dispatch({ type: "isLoggedIn", payload: props.state.reducerLog });
    } catch (error) {
      alert(error);
    }
  };

  console.log(props.state.reducerLog)

  return (
    <>
      <div id="smSpace" onClick={clickOffMenu}></div>
      <div id="sideMenu">
        {props.state.reducerLog ? (
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
            {/* <form onSubmit={onSubmit}>
              <input
                className="inputAcc"
                type="email"
                name="email"
                value={email}
                placeholder="이메일 입력"
                onChange={onChange}
              ></input>
              <input
                className="inputAcc"
                type="password"
                name="password"
                value={password}
                placeholder="비밀번호 입력"
                onChange={onChange}
              ></input>
              <br></br>
              <input id="accSubmit" type="submit" value="로그인"></input>
            </form> */}
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
      </div>
    </>
  );
};

const getStore = (state) => {
  return {
    state: state,
  };
};

export default connect(getStore)(SideMenu);
