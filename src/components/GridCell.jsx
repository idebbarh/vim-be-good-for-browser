import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCursorPos } from "../features/cursorPosSlice";
import { selectGameInfo } from "../features/gameInfoSlice";
import "./GridCell.css";

function GridCell({ cellPos, cellValue, gameType, gameDifficulty }) {
  const cursorPos = useSelector(selectCursorPos);
  const gameInfo = useSelector(selectGameInfo);
  return (
    <div
      className={`gridCell ${
        cursorPos[0] === cellPos[0] && cursorPos[1] === cellPos[1]
          ? " gridCell--haveCursor"
          : ""
      }`}
    >
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
    </div>
  );
}
export default GridCell;
