import React, { useState } from "react";
import { connect } from "react-redux";
import { authService, dbService, storageService } from "../fbase";
import moment from "moment";
import "../css/FreeChatWrite.css";

const FreeChatWrite = ({
  dispatch,
  reducerLog,
  reducerMenu,
  reducerNickname,
}) => {
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState("");

  const [imageSW, setImageSW] = useState(false);

  const onImageSW = () => {
    setImageSW(!imageSW);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (text === "") {
      alert("글내용을 입력하여주세요");
      return false;
    } else {
      let fileUrl = "";

      if (attachment !== "") {
        const attachmentRef = storageService
          .ref()
          .child(
            `FreeChat/${moment().format("YYMMDD")}/${moment().format("HHmmss")}`
          );

        const response = await attachmentRef.putString(attachment, "data_url");

        fileUrl = await response.ref.getDownloadURL();
      }

      const newPost = {
        category: "FreeChat",
        text,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        createdAtDay: moment().format("YY-MM-DD"),
        createdAtTime: moment().format("HH:mm:ss"),
        creatorUid: authService.currentUser.uid,
        nickname: reducerNickname,
        fileUrl,
      };

      await dbService.collection("FreeChatDB").add(newPost);

      setText("");
      setAttachment("");
      onImageSW();
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setText(value);
  };

  const fileChange = (event) => {
    const {
      target: { files },
    } = event;

    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      setAttachment(result);
    };

    reader.readAsDataURL(file);
  };

  //
  //
  //

  const clearAttachment = () => setAttachment("");

  const onClickBars = () => {
    dispatch({ type: "onSideMenu", payload: reducerMenu });
  };

  return (
    <div id="FreeChat">
      <div id="chatForm">
        <form onSubmit={onSubmit}>
          <div>
            <span onClick={onImageSW}>이미지 등록</span>

            {imageSW ? (
              <input type="file" accept="image/*" onChange={fileChange}></input>
            ) : null}

            {attachment ? (
              <div>
                <img src={attachment} width="100vw" height="100vw" alt="" />
                <button onClick={clearAttachment}>취소</button>
              </div>
            ) : null}
          </div>
          <div id="textDiv">
            <input
              id="textInputFreeChat"
              type="text"
              name="text"
              value={text}
              onChange={onChange}
              placeholder="글내용을 입력하여주세요"
            ></input>
            {reducerLog ? (
              <input id="submitFreeChat" type="submit" value="글등록"></input>
            ) : (
              <span onClick={onClickBars} id="submitFreeChat">
                로그인
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const getStore = ({ reducerLog, reducerMenu, reducerNickname }) => {
  return {
    reducerLog,
    reducerMenu,
    reducerNickname,
  };
};

export default connect(getStore)(FreeChatWrite);
