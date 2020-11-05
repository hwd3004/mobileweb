import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";
import "../css/MyProfile.css"

const MyProfile = ({ dispatch, reducerLog, reducerNickname }) => {
  const history = useHistory();

  const [signUpday, setSignUpDay] = useState("");
  const [email, setEmail] = useState("");

  const myInfo = async () => {
    const getEmail = await authService.currentUser.email;
    setEmail(getEmail);

    const userRef = await dbService.collection("userDB").doc(`${getEmail}`);

    await userRef.get().then((doc) => {
      setSignUpDay(doc.data().signUpDay);
    });
  };

  useEffect(() => {
    myInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="MyProfile">
      {reducerLog ? null : history.push("/")}
      <fieldset>
        <legend>내 정보</legend>
        <div>
          <p>이메일</p>
          <p>{email}</p>
        </div>
        <div>
          <p>닉네임</p>
          <p>{reducerNickname}</p>
        </div>
        <div>
          <p>가입일</p>
          <p>{signUpday}</p>
        </div>
      </fieldset>
    </div>
  );
};

const getStore = ({ reducerLog, reducerNickname }) => {
  return {
    reducerLog,
    reducerNickname,
  };
};

export default connect(getStore)(MyProfile);
