import React, { useEffect, useState } from "react";
import "./GameGrid.css"
import GridRow from "./GridRow"
const NUM_OF_ROWS=80;
function GameGrid({cursorPos}){
    const [rowsElem,setRowsElem] =useState([]);
    useEffect(()=>{
        let rowsList = []
    for(let i = 0;i<NUM_OF_ROWS;i++){
        rowsList.push(<GridRow key={i} rowPos={i} cursorPos={cursorPos} />) 
    } 
        setRowsElem(rowsList)
    },[])
    return (
        <div className="gameGrid">
        {rowsElem}
        </div>
    )
}
export default GameGrid;
