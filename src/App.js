import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import GameGrid from "./components/GameGrid";
import { selectCursorPos, setNewValue } from "./features/cursorPosSlice";

export const NUM_OF_ROWS = 80;
export const NUM_OF_COLS = 40;

function App() {
  const jumpsNumRef = useRef([]);
  const didMount = useRef(false);
  const cursorPos = useSelector(selectCursorPos);
  const cursorPosRef = useRef(cursorPos);
  const dispatch = useDispatch();
  useEffect(() => {
    cursorPosRef.current = cursorPos;
  }, [cursorPos]);
  const changeCursorPlace = (pressedKey) => {
    const up = pressedKey === "k" && cursorPosRef.current[0] > 0;
    const down = pressedKey === "j" && cursorPosRef.current[0] < NUM_OF_ROWS;
    const right = pressedKey === "l" && cursorPosRef.current[1] < NUM_OF_COLS;
    const left = pressedKey === "h" && cursorPosRef.current[1] > 0;
    const jumpsNum =
      jumpsNumRef.current.length > 0
        ? parseInt(jumpsNumRef.current.join(""))
        : 1;
    jumpsNumRef.current = [];

    console.log(jumpsNum);
    dispatch(
      setNewValue([
        up
          ? cursorPosRef.current[0] - jumpsNum >= 0
            ? cursorPosRef.current[0] - jumpsNum
            : 0
          : down
          ? cursorPosRef.current[0] + jumpsNum < NUM_OF_ROWS
            ? cursorPosRef.current[0] + jumpsNum
            : NUM_OF_ROWS - 1
          : cursorPosRef.current[0],
        right
          ? cursorPosRef.current[1] + jumpsNum < NUM_OF_COLS
            ? cursorPosRef.current[1] + jumpsNum
            : NUM_OF_COLS - 1
          : left
          ? cursorPosRef.current[1] - jumpsNum >= 0
            ? cursorPosRef.current[1] - jumpsNum
            : 0
          : cursorPosRef.current[1],
      ])
    );
  };
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      document.addEventListener("keyup", (e) => {
        if (["k", "j", "l", "h"].includes(e.key)) {
          changeCursorPlace(e.key);
        } else if (!isNaN(e.key)) {
          if (e.key !== "0" || jumpsNumRef.current.length > 0) {
            jumpsNumRef.current = [...jumpsNumRef.current, e.key];
          }
        }
      });
    }
    return () => {
      document.removeEventListener("keyup", (e) => {
        if (["k", "j", "l", "h"].includes(e.key)) {
          changeCursorPlace(e.key);
        } else if (!isNaN(e.key)) {
          if (e.key !== "0" || jumpsNumRef.current.length > 0) {
            jumpsNumRef.current = [...jumpsNumRef.current, e.key];
          }
        }
      });
    };
  }, []);
  console.log(cursorPos);
  return (
    <div className="App">
      <GameGrid />
    </div>
  );
}

export default App;
