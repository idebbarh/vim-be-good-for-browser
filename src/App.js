import React, { useEffect, useState } from 'react';
import './App.css';
import GameGrid from "./components/GameGrid"
function App() {
    const [cursorPos,setCursoPos]=useState([0,0])
    useEffect(()=>{
        document.addEventListener("keypress",(e)=>{
            console.log(e.key)
        })
    },[])
  return (
    <div className="App">
        <GameGrid cursorPos={cursorPos}/>
    </div>
  );
}

export default App;
