import React from "react";
import welcome from "../assets/image/welcome.svg";
import good_doggy from "../assets/image/good_doggy.svg";
import "../css/Main.css";
import { connect } from "react-redux";

const Main = ({ dispatch, reducerMenu }) => {
  const onSideMenu = () => {
    dispatch({ type: "onSideMenu", payload: reducerMenu });
  };
  return (
    <div id="Main">
      <div>
        <img src={welcome} alt="welcome" />
        <br></br>
        <br></br>
        <p>환영합니다!</p>
        <br></br>
        <p>
          닥터펫은 애완동물과 관련된<br></br>다양한 컨텐츠를 제공합니다
        </p>
        <br></br>
      </div>
      <div>
        <img src={good_doggy} alt="good_doggy" />
        <br></br>
        <br></br>
        <p>
          로그인을 한 후, 채팅방에서<br></br>커뮤니케이션을 나눠보세요
        </p>
        <br></br>
        <span id="onMenu" onClick={onSideMenu}>메뉴 열기</span>
      </div>
    </div>
  );
};

const getStore = ({ reducerMenu }) => {
  return {
    reducerMenu,
  };
};

export default connect(getStore)(Main);
