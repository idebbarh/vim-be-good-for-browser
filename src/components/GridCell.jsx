import React from "react";
import "./GridCell.css"


function GridCell({cursorPos,cellPos}){
    return (
        <div className={`gridCell${cursorPos === cellPos ? ' gridCell--haveCursor' : ''}`}>
            
        </div>
    )
}
export default GridCell;
