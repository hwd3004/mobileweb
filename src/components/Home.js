import React from "react";
import Logo from "../assets/image/logo.svg";
import "../css/Home.css";

const Home = () => {
  const onClickLogo = () => {
    window.location.replace("/");
  };

  return (
    <div id="Home">
      <div id="wrap">
        <div id="pcHeader">
          <img
            id="pclogo"
            src={Logo}
            alt="닥터펫 로고"
            onClick={onClickLogo}
          ></img>

          <h1 onClick={onClickLogo}>닥터펫</h1>

          <div id="pcLoginDiv">
            <form>
              <input type="email" minLength="6" required></input>

              <input type="password" minLength="6" required></input>

              <button type="submit">로그인</button>
            </form>

            <button>회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
