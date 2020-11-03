import React, { useState } from "react";
import "./css/SignUp.css";
import { authService, dbService } from "./fbase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState(false);
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
    }

    if (password === checkPassword) {
      setMatchPassword(false);
    } else {
      setMatchPassword(true);
      // 비밀번호 확인값이 다르므로 가입하기 막고 얼럿 띄워야함
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await authService.createUserWithEmailAndPassword(email, password);

      // await dbService.crea
    } catch (error) {}
  };

  return (
    <div id="SignUp">
      <form id="signUpForm" onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={email}
          minLength="6"
          required
          type="email"
          placeholder="이메일을 입력하여주세요"
        ></input>
        <input
          onChange={onChange}
          value={password}
          minLength="6"
          required
          type="password"
          placeholder="비밀번호를 6자 이상 입력하여주세요"
        ></input>
        <input
          onChange={onChange}
          value={checkPassword}
          minLength="6"
          required
          type="password"
          placeholder="비밀번호를 확인하여주세요"
        ></input>
        <input type="submit" value="가입하기"></input>
      </form>
    </div>
  );
};

export default SignUp;
