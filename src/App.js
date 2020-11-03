import React, { useEffect, useState } from "react";
import MapContainer from "./MapContainer";
import "./css/App.css";
import Logo from "./assets/image/logo.svg";
import SideMenu from "./SideMenu";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignUp from "./SignUp";
import { authService } from "./fbase";

const App = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        props.dispatch({ type: "isLoggedIn", payload: true });
      } else {
        props.dispatch({ type: "isLoggedIn", payload: false });
      }
    });
    setInit(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const COORDS = "coords";
  const handleGeoSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
      latitude,
      longitude,
    };

    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
  };

  const handleGeoError = () => {
    alert("위치 정보를 불러올 수 없습니다");
  };

  navigator.geolocation.watchPosition(handleGeoSuccess, handleGeoError);

  //
  //
  //

  // const [onClickMenu, setOnClickMenu] = useState(false);
  //
  // const onClickBars = (event) => {
  //   setOnClickMenu(!onClickMenu);
  //   console.log(onClickMenu);
  // };

  //
  //
  //

  const onClickBars = () => {
    props.dispatch({ type: "onSideMenu", payload: props.state.reducerSMS });
  };

  const onClickLogo = () => {
    window.location.replace("/");
  };

  return (
    <div id="App">
      {init ? (
        <>
          <header>
            <img
              id="logo"
              src={Logo}
              alt="닥터펫 로고"
              onClick={onClickLogo}
            ></img>
            <h1 onClick={onClickLogo}>닥터펫</h1>
            {/* <span id="menu" onClick={onClickBars}>
            <i className="fas fa-bars"></i>
          </span> */}
            <span id="menu" onClick={onClickBars}>
              <i className="fas fa-bars"></i>
            </span>
          </header>

          {props.state.reducerSMS ? <SideMenu /> : null}

          {/* <MapContainer />
        <div id="temp"></div> */}

          <Switch>
            <Route exact path="/SignUp">
              <SignUp />
            </Route>
          </Switch>
        </>
      ) : null}
    </div>
  );
};

const getStore = (state) => {
  console.log("getStore", state);
  return {
    state: state,
  };
};

export default connect(getStore)(App);
