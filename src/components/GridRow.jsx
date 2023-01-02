import React, { useEffect, useState } from "react";
import "./GridRow.css";
import GridCell from "./GridCell";
import { selectCursorPos } from "../features/cursorPosSlice";
import { useSelector } from "react-redux";
import { NUM_OF_COLS } from "../constantValues";
function GridRow({ rowPos, rowValue }) {
  const [cellsElem, setCellsElem] = useState([]);
  const cursorPos = useSelector(selectCursorPos);
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
            rowValue?.insertionCol <= i &&
            indexCounter < rowValue?.text?.length
              ? rowValue?.text[indexCounter]
              : null
          }
          gameType={
            rowValue !== null &&
            rowValue?.insertionCol <= i &&
            rowValue?.type === "game"
              ? rowValue?.gameType
              : null
          }
          gameDifficulty={
            rowValue !== null &&
            rowValue?.insertionCol <= i &&
            rowValue?.type === "difficulty"
              ? rowValue?.gameDifficulty
              : null
          }
        />
      );
      if (
        rowValue?.insertionCol <= i &&
        rowValue !== null &&
        indexCounter < rowValue?.text?.length
      ) {
        indexCounter++;
      }
    }
    setCellsElem(cellsList);
  }, [rowValue, rowPos]);
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
