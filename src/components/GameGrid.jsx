import React, { useEffect, useState } from "react";
import { NUM_OF_ROWS } from "../App";
import "./GameGrid.css";
import GridRow from "./GridRow";
import AVAILABLE_INSERTIONS from "../avialableInsertions";
import { useSelector } from "react-redux";
import { selectGameInfo } from "../features/gameInfoSlice";
import { selecteRandomValueForSomeGame } from "../features/randomValueForSomeGameSlice";
function GameGrid() {
  const [rowsElem, setRowsElem] = useState([]);
  const gameInfo = useSelector(selectGameInfo);
  const randomValueForSomeGame = useSelector(selecteRandomValueForSomeGame);
  useEffect(() => {
    let rowsList = [];
    let indexCounter = 0;
    let textsPosInGrid = [];
    const mainValue = gameInfo.isGameStarted
      ? randomValueForSomeGame
      : AVAILABLE_INSERTIONS;
    for (let key in mainValue) {
      if (!isNaN(key)) {
        textsPosInGrid.push(key);
      }
    }
    for (let i = 0; i < NUM_OF_ROWS; i++) {
      rowsList.push(
        <GridRow
          key={i}
          rowPos={i}
          rowValue={
            indexCounter < textsPosInGrid.length &&
            mainValue[textsPosInGrid[indexCounter]]?.insertionRow === i
              ? mainValue[textsPosInGrid[indexCounter]]
              : null
          }
        />
      );
      if (
        indexCounter < textsPosInGrid.length &&
        mainValue[textsPosInGrid[indexCounter]]?.insertionRow === i
      ) {
        indexCounter++;
      }
    }
    setRowsElem(rowsList);
  }, [gameInfo, randomValueForSomeGame]);
  return <div className="gameGrid">{rowsElem}</div>;
}
export default GameGrid;
