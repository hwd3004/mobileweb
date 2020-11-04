import React, { useState } from "react";

import { connect } from "react-redux";

const FreeBoardWrite = ({ reducerLog }) => {
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSumbit = async (event) => {
    event.preventDefault();
  };
  return <div id="FreeBoard"></div>;
};

const getStore = ({ reducerLog }) => {
  return {
    reducerLog,
  };
};

export default connect(getStore)(FreeBoardWrite);
