import React from "react";
import "../css/Mobile.css";
import Logo from "../assets/image/logo.svg";
import SideMenu from "./SideMenu";
import { connect } from "react-redux";

import { authService, dbService } from "../fbase";

import Main from "./Main";

const Mobile = (props) => {
  console.log("App.js/props", props);
  const { dispatch, reducerLog, reducerMenu } = props;

  // const [init, setInit] = useState(false);

  // useEffect(() => {
  //   authService.onAuthStateChanged((user) => {
  //     // if (user) {
  //     //   props.dispatch({ type: "isLoggedIn", payload: props.state.reducerLog });
  //     // } else {
  //     //   props.dispatch({ type: "isLoggedIn", payload: props.state.reducerLog });
  //     // }
  //     if (user) {
  //       // props.dispatch({ type: "isLoggedIn", payload: props.reducerLog });
  //       dispatch({ type: "isLoggedIn", payload: reducerLog });
  //     }

  //     // 중요!!!
  //     // SideMenu.js에서 로그아웃하는 함수에 props.dispatch({ type: "isLoggedIn", payload: props.state.reducerLog });
  //     // 이거 해주고, App.js에서는 if 다음 else에 다시 props 보내주는건 지웠더니 잘된다

  //     setInit(true);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  //
  //
  //

  const getNickname = async () => {
    const userRef = await dbService
      .collection("userDB")
      .doc(`${authService.currentUser.email}`);

    const nickname = await userRef.get().then((doc) => {
      return doc.data().nickname;
    });

    dispatch({ type: "nickname", payload: nickname });
  };

  if (reducerLog) {
    getNickname();
  }

  const onClickBars = () => {
    dispatch({ type: "onSideMenu", payload: reducerMenu });
  };

  const onClickLogo = () => {
    window.location.replace("/");
  };

  return (
    <div id="Mobile">
      <>
        <header>
          <img
            id="logo"
            src={Logo}
            alt="닥터펫 로고"
            onClick={onClickLogo}
          ></img>
          <h1 onClick={onClickLogo}>닥터펫</h1>

          <span id="menu" onClick={onClickBars}>
            <i className="fas fa-bars"></i>
          </span>
        </header>

        {reducerMenu ? <SideMenu /> : null}

        <Main />
      </>
      )
    </div>
  );
};

// const getStore = ({ reducerMenu, reducerLog, reducerNickname }) => {
//   return {
//     reducerMenu,
//     reducerLog,
//     reducerNickname,
//   };
// };

const getStore = (state) => {
  console.log("App.js/getStore state", state);
  const { reducerMenu, reducerLog, reducerNickname } = state;
  return {
    reducerMenu,
    reducerLog,
    reducerNickname,
  };
};

export default connect(getStore)(Mobile);
