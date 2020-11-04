import React, { useState } from "react";
import { connect } from "react-redux";
import { authService, dbService, storageService } from "./fbase";
import moment from "moment";

const FreeBoardWrite = ({ reducerLog }) => {
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSumbit = async (event) => {
    event.preventDefault();

    let fileUrl = "";

    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(
          `FreeBoard/${moment().format("YYMMDD")}/${moment().format("HHmmss")}`
        );

      const response = await attachmentRef.putString(attachment, "data_url");

      fileUrl = await response.ref.getDownloadURL();

      const textObj = {
        category: "FreeBoard",
        text,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        creatorUid: authService.currentUser.uid,
        email: authService.currentUser.email,
        upVote: 0,
        comment: [],
        views: 0,
        fileUrl,
      };

      
    }
  };
  return <div id="FreeBoard"></div>;
};

const getStore = ({ reducerLog }) => {
  return {
    reducerLog,
  };
};

export default connect(getStore)(FreeBoardWrite);
