import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import GameGrid from "./components/GameGrid";
import { selectCursorPos, setNewValue } from "./features/cursorPosSlice";
import { selectGameInfo, setGameInfo } from "./features/gameInfoSlice";
import AVAILABLE_INSERTIONS from "./avialableInsertions";
import {
  selecteRandomValueForSomeGame,
  setRandomValueForSomeGame,
} from "./features/randomValueForSomeGameSlice";
import DIFFICULTY_SETTING from "./difficultySetting";

export const NUM_OF_ROWS = 80;
export const NUM_OF_COLS = 80;
export const INSERTION_COL = 5;

function App() {
  const jumpsNumRef = useRef([]);
  const didMount = useRef(false);
  const cursorPos = useSelector(selectCursorPos);
  const cursorPosRef = useRef(cursorPos);
  const dispatch = useDispatch();
  const otherPressedKeys = useRef([]);
  const gameInfo = useSelector(selectGameInfo);
  const randomValueForSomeGame = useSelector(selecteRandomValueForSomeGame);
  const randomValueForSomeGameRef = useRef(randomValueForSomeGame);
  const gameInfoRef = useRef();
  const gameLoopInterval = useRef(null);
  useEffect(() => {
    cursorPosRef.current = cursorPos;
    randomValueForSomeGameRef.current = randomValueForSomeGame;
  }, [cursorPos, randomValueForSomeGame]);
  useEffect(() => {
    gameInfoRef.current = gameInfo;
    if (gameInfo.isGameStarted) {
      setNewGameLoopInterval();
    } else {
      clearInterval(gameLoopInterval.current);
    }
    return () => {
      clearInterval(gameLoopInterval.current);
    };
  }, [gameInfo]);
  const setNewGameLoopInterval = () => {
    changeTheRandomValueForSomeGame();
    gameLoopInterval.current = setInterval(
      changeTheRandomValueForSomeGame,
      DIFFICULTY_SETTING[gameInfoRef.current.gameDifficulty]?.roundTime * 1000
    );
  };
  const changeTheRandomValueForSomeGame = () => {
    const randomRow = Math.floor(Math.random() * 12);
    dispatch(
      setRandomValueForSomeGame({
        randomRow: randomRow,
        [randomRow]: {
          text: gameInfoRef.current.gameText,
          insertionRow: randomRow,
          type: "randomValueForSomeGame",
        },
      })
    );
  };
  const changeGameState = (pressedKey) => {
    if (otherPressedKeys.current.length === 0) {
      otherPressedKeys.current = [pressedKey];
      return;
    }
    if (
      !gameInfoRef.current.isGameStarted &&
      cursorPosRef.current[0] in AVAILABLE_INSERTIONS
    ) {
      if (AVAILABLE_INSERTIONS[cursorPosRef.current[0]].type === "game") {
        dispatch(
          setGameInfo({
            ...gameInfoRef.current,
            isGameStarted: true,
            gameType: AVAILABLE_INSERTIONS[cursorPosRef.current[0]].gameType,
            gameText: AVAILABLE_INSERTIONS[cursorPosRef.current[0]].gameText,
          })
        );
      } else if (
        AVAILABLE_INSERTIONS[cursorPosRef.current[0]].type === "difficulty"
      ) {
        dispatch(
          setGameInfo({
            ...gameInfoRef.current,
            gameDifficulty:
              AVAILABLE_INSERTIONS[cursorPosRef.current[0]].gameDifficulty,
          })
        );
      }
      return;
    }
    const numberOfRandomRow = randomValueForSomeGameRef.current?.randomRow;
    if (
      gameInfoRef.current.isGameStarted &&
      cursorPosRef.current[0] === numberOfRandomRow
    ) {
      otherPressedKeys.current = [];
      dispatch(
        setRandomValueForSomeGame({
          [numberOfRandomRow]: {
            ...randomValueForSomeGameRef.current.numberOfRandomRow,
            text: "",
          },
        })
      );
      clearInterval(gameLoopInterval.current);
      setNewGameLoopInterval();
      return;
    }
    otherPressedKeys.current = [];
    return;
  };
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
    otherPressedKeys.current = [];
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
        } else if (e.key === "d") {
          changeGameState(e.key);
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
        } else if (e.key === "d") {
          changeGameState(e.key);
        }
      });
    };
  }, []);
  return (
    <div className="App">
      <GameGrid />
    </div>
  );
}

export default App;
