import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCursorPos } from "../features/cursorPosSlice";
import "./GridCell.css";

function GridCell({ cellPos }) {
  const cursorPos = useSelector(selectCursorPos);
  return (
    <div
      className={`gridCell ${
        cursorPos[0] === cellPos[0] && cursorPos[1] === cellPos[1]
          ? " gridCell--haveCursor"
          : ""
      }`}
    />
  );
}
export default GridCell;
