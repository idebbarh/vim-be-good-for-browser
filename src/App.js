import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import GameGrid from "./components/GameGrid";
import { selectCursorPos, setNewValue } from "./features/cursorPosSlice";
import { selectGameInfo, setGameInfo } from "./features/gameInfoSlice";

export const NUM_OF_ROWS = 80;
export const NUM_OF_COLS = 80;
export const AVAILABLE_INSERTIONS = {
  1: {
    text: "VimBeGood is a collection of small games for neovim which are",
    insertionRow: 1,
    type: "title",
  },
  2: {
    text: "intended to help you improve your vim proficiency.",
    insertionRow: 2,
    type: "title",
  },
  3: {
    text: "delete a line to select the line.  If you delete a difficulty,",
    insertionRow: 3,
    type: "title",
  },
  4: {
    text: "it will select that difficulty, but if you delete a game it",
    insertionRow: 4,
    type: "title",
  },
  5: {
    text: "will start the game.",
    insertionRow: 5,
    type: "title",
  },
  7: {
    text: "Select a Game (delete from the list to select)",
    insertionRow: 7,
    type: "title",
  },
  8: {
    text: "----------------------------------------------",
    insertionRow: 8,
    type: "title",
  },
  9: {
    text: "[*] relative",
    insertionRow: 9,
    type: "game",
    gameType: "relative",
  },
  10: { text: "[*] ci", insertionRow: 10, type: "game", gameType: "ci" },
  11: { text: "[*] words", insertionRow: 11, type: "game", gameType: "words" },
  12: { text: "[*] hjkl", insertionRow: 12, type: "game", gameType: "hjkl" },
  13: {
    text: "[*] random",
    insertionRow: 13,
    type: "game",
    gameType: "random",
  },
  14: {
    text: "[*] whackamole",
    insertionRow: 14,
    type: "game",
    gameType: "whackamole",
  },

  16: {
    text: "Select a Difficulty (delete from the list to select)",
    insertionRow: 16,
    type: "title",
  },
  17: {
    text: "----------------------------------------------------",
    insertionRow: 17,
    type: "title",
  },
  18: {
    text: "[*] noob",
    insertionRow: 18,
    type: "difficulty",
    gameDifficulty: "noob",
  },
  19: {
    text: "[*] easy",
    insertionRow: 19,
    type: "difficulty",
    gameDifficulty: "easy",
  },
  20: {
    text: "[*] medium",
    insertionRow: 20,
    type: "difficulty",
    gameDifficulty: "medium",
  },
  21: {
    text: "[*] hard",
    insertionRow: 21,
    type: "difficulty",
    gameDifficulty: "hard",
  },
  22: {
    text: "[*] nightmare",
    insertionRow: 22,
    type: "difficulty",
    gameDifficulty: "nightmare",
  },
  23: {
    text: "[*] tpope",
    insertionRow: 23,
    type: "difficulty",
    gameDifficulty: "tpope",
  },
};
export const INSERTION_COL = 5;
function App() {
  const jumpsNumRef = useRef([]);
  const didMount = useRef(false);
  const cursorPos = useSelector(selectCursorPos);
  const cursorPosRef = useRef(cursorPos);
  const dispatch = useDispatch();
  const otherPressedKeys = useRef([]);
  const gameInfo = useSelector(selectGameInfo);
  const gameInfoRef = useRef();
  console.log(gameInfo);
  useEffect(() => {
    cursorPosRef.current = cursorPos;
    gameInfoRef.current = gameInfo;
  }, [cursorPos, gameInfo]);
  const changeGameInfo = (pressedKey) => {
    if (pressedKey === "d" && otherPressedKeys.current.length === 0) {
      otherPressedKeys.current = [pressedKey];
      return;
    }
    if (
      (gameInfo === null || gameInfo.isGameStarted === false) &&
      pressedKey === "d" &&
      cursorPosRef.current[0] in AVAILABLE_INSERTIONS
    ) {
      otherPressedKeys.current = [];
      if (AVAILABLE_INSERTIONS[cursorPosRef.current[0]].type === "game") {
        dispatch(
          setGameInfo({
            ...gameInfoRef.current,
            isGameStarted: true,
            gameType: AVAILABLE_INSERTIONS[cursorPosRef.current[0]].gameType,
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
    if (pressedKey === "d") {
      otherPressedKeys.current = [];
      return;
    }
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
          changeGameInfo(e.key);
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
          changeGameInfo(e.key);
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
