import React, { createRef, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCursorPos } from "../features/cursorPosSlice";
import { selectGameInfo } from "../features/gameInfoSlice";
import "./GridCell.css";

function GridCell({ cellPos, cellValue, gameType, gameDifficulty }) {
  const cursorPos = useSelector(selectCursorPos);
  const gameInfo = useSelector(selectGameInfo);
  const cellRef = createRef(null);
  useEffect(() => {
    if (cursorPos[0] === cellPos[0] && cursorPos[1] === cellPos[1]) {
      if (cellRef.current) {
        cellRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    } else {
      if (cellRef.current) {
        cellRef.current.scrollIntoView = function () {};
      }
    }
  }, [cursorPos]);
  return (
    <div className="gridCell">
      {cellValue !== null && (
        <span className="cellValue">
          {cellValue !== "*"
            ? cellValue
            : gameType !== null
            ? gameType === gameInfo?.gameType
              ? "x"
              : ""
            : gameDifficulty !== null
            ? gameDifficulty === gameInfo?.gameDifficulty
              ? "x"
              : ""
            : ""}
        </span>
      )}
      {cursorPos[0] === cellPos[0] && cursorPos[1] === cellPos[1] && (
        <span className="cursor" ref={cellRef}></span>
      )}
    </div>
  );
}
export default GridCell;
