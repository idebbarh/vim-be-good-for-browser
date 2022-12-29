import React, { useEffect, useState } from "react";
import "./GridRow.css";
import GridCell from "./GridCell";
import { NUM_OF_COLS, INSERTION_COL } from "../App";
import { selectCursorPos } from "../features/cursorPosSlice";
import { useSelector } from "react-redux";
import { selecteRandomValueForSomeGame } from "../features/randomValueForSomeGameSlice";
import { selectGameInfo } from "../features/gameInfoSlice";
function GridRow({ rowPos, rowValue }) {
  const [cellsElem, setCellsElem] = useState([]);
  const cursorPos = useSelector(selectCursorPos);
  const gameInfo = useSelector(selectGameInfo);
  const randomValueForSomeGame = useSelector(selecteRandomValueForSomeGame);
  useEffect(() => {
    let cellsList = [];
    let indexCounter = 0;
    for (let i = 0; i < NUM_OF_COLS; i++) {
      cellsList.push(
        <GridCell
          key={`${rowPos},${i}`}
          cellPos={[rowPos, i]}
          cellValue={
            rowValue !== null &&
            INSERTION_COL <= i &&
            indexCounter < rowValue?.text?.length
              ? rowValue?.text[indexCounter]
              : null
          }
          gameType={
            rowValue !== null && INSERTION_COL <= i && rowValue?.type === "game"
              ? rowValue?.gameType
              : null
          }
          gameDifficulty={
            rowValue !== null &&
            INSERTION_COL <= i &&
            rowValue?.type === "difficulty"
              ? rowValue?.gameDifficulty
              : null
          }
        />
      );
      if (
        INSERTION_COL <= i &&
        rowValue !== null &&
        indexCounter < rowValue?.text?.length
      ) {
        indexCounter++;
      }
    }
    setCellsElem(cellsList);
  }, [rowValue]);
  return (
    <div className="gridRow">
      <span
        className={`number${
          cursorPos[0] === rowPos ? " number--relativenumber" : ""
        }`}
      >
        {cursorPos[0] === rowPos ? rowPos : Math.abs(rowPos - cursorPos[0])}
      </span>
      {cellsElem}
    </div>
  );
}
export default GridRow;
