import React, { useEffect, useState } from "react";
import { AVAILABLE_INSERTIONS, NUM_OF_ROWS } from "../App";
import "./GameGrid.css";
import GridRow from "./GridRow";
function GameGrid() {
  const [rowsElem, setRowsElem] = useState([]);
  useEffect(() => {
    let rowsList = [];
    let indexCounter = 0;
    let textsPosInGrid = [];
    for (let key in AVAILABLE_INSERTIONS) {
      textsPosInGrid.push(key);
    }
    for (let i = 0; i < NUM_OF_ROWS; i++) {
      rowsList.push(
        <GridRow
          key={i}
          rowPos={i}
          rowValue={
            indexCounter < textsPosInGrid.length &&
            AVAILABLE_INSERTIONS[textsPosInGrid[indexCounter]]?.insertionRow ===
              i
              ? AVAILABLE_INSERTIONS[textsPosInGrid[indexCounter]]
              : null
          }
        />
      );
      if (
        indexCounter < textsPosInGrid.length &&
        AVAILABLE_INSERTIONS[textsPosInGrid[indexCounter]]?.insertionRow === i
      ) {
        indexCounter++;
      }
    }
    setRowsElem(rowsList);
  }, []);
  return <div className="gameGrid">{rowsElem}</div>;
}
export default GameGrid;
