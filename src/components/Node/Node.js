import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../Context";
import { INITIAL_COLOR, VISITED_COLOR, REACTKEYS } from "../../actionTypes";
import "./Node.scss";

const Node = ({ rowIdx, colIdx }) => {
  return <div className="boardNode"></div>;
};

export default Node;
