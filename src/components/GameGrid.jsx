import React, { useEffect, useState } from "react";
import { NUM_OF_ROWS } from "../App";
import "./GameGrid.css";
import GridRow from "./GridRow";
function GameGrid() {
  const [rowsElem, setRowsElem] = useState([]);
  useEffect(() => {
    let rowsList = [];
    for (let i = 0; i < NUM_OF_ROWS; i++) {
      rowsList.push(<GridRow key={i} rowPos={i} />);
    }
    setRowsElem(rowsList);
  }, []);
  return <div className="gameGrid">{rowsElem}</div>;
}
export default GameGrid;
