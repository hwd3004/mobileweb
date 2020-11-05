import React, { useState } from "react";
import "../css/SignUp.css";
import { authService, dbService } from "../fbase";
import moment from "moment";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState(false);
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("noSet");
  const [phoneNumber, setPhoneNumber] = useState("기입안함");
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "checkPassword") {
      setCheckPassword(value);
    } else if (name === "gender") {
      setGender(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    } else if (name === "nickname") {
      setNickname(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (password === checkPassword) {
      setMatchPassword(false);
    } else {
      setMatchPassword(true);
      // 비밀번호 확인값이 다르므로 가입하기 막고 얼럿 띄워야함
    }

    if (matchPassword === false) {
      try {
        await authService.createUserWithEmailAndPassword(email, password);

        await dbService
          .collection("userDB")
          .doc(email)
          .set({
            uid: authService.currentUser.uid,
            email,
            password,
            gender,
            phoneNumber,
            nickname,
            signUpDay: moment().format("YYYY-MM-DD HH:mm:ss"),
            permission: "user",
          });
      } catch (error) {
        setError(error);
      }

      history.push("/");
    } else if (matchPassword === true) {
      alert("비밀번호를 확인하여주세요");
    }
  };

  return (
    <div id="SignUp">
      <p id="signUpHead">회원가입</p>
      <form id="signUpForm" onSubmit={onSubmit}>
        <div id="signUp1stDiv">
          <span>이메일 입력</span>
          <input
            className="signUpInput"
            onChange={onChange}
            value={email}
            name="email"
            minLength="6"
            required
            type="email"
            placeholder="아이디로 사용할 이메일을 입력하여주세요"
          ></input>

          <span>비밀번호 입력</span>
          <input
            className="signUpInput"
            onChange={onChange}
            value={password}
            name="password"
            minLength="6"
            required
            type="password"
            placeholder="비밀번호를 6자 이상 입력하여주세요"
          ></input>

          <span>비밀번호 확인</span>
          <input
            className="signUpInput"
            onChange={onChange}
            value={checkPassword}
            name="checkPassword"
            minLength="6"
            required
            type="password"
            placeholder="비밀번호를 확인하여주세요"
          ></input>

          <span>닉네임 입력</span>
          <input
            className="signUpInput"
            onChange={onChange}
            value={nickname}
            name="nickname"
            minLength="2"
            maxLength="10"
            required
            type="text"
            placeholder="닉네임을 입력하여주세요"
          ></input>
        </div>

        <fieldset>
          <legend>선택사항</legend>
          <fieldset>
            <legend>성별</legend>
            <label>
              <input
                onChange={onChange}
                name="gender"
                type="radio"
                value="male"
              />
              남성
            </label>
            <label>
              <input
                onChange={onChange}
                name="gender"
                type="radio"
                value="female"
              />
              여성
            </label>
            <label>
              <input
                onChange={onChange}
                name="gender"
                type="radio"
                value="noSet"
              />
              구별 안함
            </label>
          </fieldset>

          <span>폰번호</span>
          <input
            onChange={onChange}
            value={phoneNumber}
            minLength="10"
            type="number"
            name="phoneNumber"
            placeholder="'-'를 빼고 입력해주세요."
          ></input>
        </fieldset>

        <p>{error}</p>

        <input id="signUpSubmit" type="submit" value="가입하기"></input>
      </form>
    </div>
  );
};

export default SignUp;
