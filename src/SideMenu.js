import React from "react";
import { Link } from "react-router-dom";
import "./css/SideMenu.css";
import { connect } from "react-redux";

const SideMenu = (props) => {
  const clickOffMenu = () => {
    props.dispatch({ type: "onSideMenu", payload: props.state.reducerSMS });
  };
  return (
    <>
      <div id="smSpace" onClick={clickOffMenu}></div>
      <div id="sideMenu">
        <form>
          <input
            className="inputAcc"
            type="text"
            placeholder="아이디 입력"
          ></input>
          <input
            className="inputAcc"
            tpye="password"
            placeholder="비밀번호 입력"
          ></input>
          <br></br>
          <input id="accSubmit" type="submit" value="로그인"></input>
        </form>
        <br></br>
        <Link id="linkSignUp" to="/SignUp" onClick={clickOffMenu}>
          가입하기
        </Link>
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
