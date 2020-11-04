import React from "react";

import { connect } from "react-redux";

const FreeBoard = ({ dispatch, reducerLog }) => {
  return <div id="FreeBoard"></div>;
};

const getStore = ({ reducerLog }) => {
  return {
    reducerLog,
  };
};

export default connect(getStore)(FreeBoard);
