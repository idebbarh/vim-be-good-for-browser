import React, { useEffect, useState } from "react";
import "./GridRow.css"
import GridCell from "./GridCell"
const NUM_OF_COLS = 40;
function GridRow({rowPos,cursorPos}) {
    const [cellsElem,setCellsElem] = useState([])
    useEffect(()=>{
        let cellsList = [];
        for(let i = 0 ; i < NUM_OF_COLS; i++){
            cellsList.push(<GridCell key={`${rowPos},${i}`} cursorPos={cursorPos} cellPos={[rowPos,i]}/>);
        }
        setCellsElem(cellsList)
    },[])
    return(
        <div className="gridRow">
            {cellsElem}            
        </div>
    )    
}
export default GridRow;
