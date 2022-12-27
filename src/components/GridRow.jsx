import React, { useEffect, useState } from "react";
import "./GridRow.css";
import GridCell from "./GridCell";
import { NUM_OF_COLS } from "../App";
import { selectCursorPos } from "../features/cursorPosSlice";
import { useSelector } from "react-redux";
function GridRow({ rowPos }) {
  const [cellsElem, setCellsElem] = useState([]);
  const cursorPos = useSelector(selectCursorPos);
  useEffect(() => {
    let cellsList = [];
    for (let i = 0; i < NUM_OF_COLS; i++) {
      cellsList.push(<GridCell key={`${rowPos},${i}`} cellPos={[rowPos, i]} />);
    }
    setCellsElem(cellsList);
  }, []);
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
