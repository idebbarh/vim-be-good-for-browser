import React, { useEffect, useRef } from "react";
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
export const NUMBER_OF_ROUNDES = 10;
export function delayFunction(delayTime) {
  return new Promise((resolve) => setTimeout(resolve, delayTime));
}
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
  const gameInfoRef = useRef(gameInfo);
  const gameLoopInterval = useRef(null);
  const isWinInTheRound = useRef(false);

  useEffect(() => {
    cursorPosRef.current = cursorPos;
    randomValueForSomeGameRef.current = randomValueForSomeGame;
  }, [cursorPos, randomValueForSomeGame]);
  useEffect(() => {
    gameInfoRef.current = gameInfo;
    if (gameInfo.isGameStarted) {
      if (!gameInfo.isGameCountdownDone) {
        startGameCountdown();
      } else {
        setNewGameLoopInterval();
      }
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
    const randomRow = Math.floor(Math.random() * 12) + 1;
    let currentRound = 0;
    let currentScore = 0;
    if (randomValueForSomeGameRef.current.currentRandomRow) {
      const oldRandomRow = randomValueForSomeGameRef.current.currentRandomRow;
      currentRound =
        randomValueForSomeGameRef.current[oldRandomRow].gameCurrentRound + 1;
      currentScore =
        randomValueForSomeGameRef.current[oldRandomRow].gameCurrentScore;

      if (isWinInTheRound.current) {
        currentScore++;
      }
    }
    console.log(currentScore);
    dispatch(
      setRandomValueForSomeGame({
        0: {
          text: `Round ${currentRound}/${NUMBER_OF_ROUNDES}`,
          insertionRow: 0,
          type: "constantText",
        },
        currentRandomRow: randomRow,
        [randomRow]: {
          text: gameInfoRef.current.gameText,
          insertionRow: randomRow,
          type: "randomValueForSomeGame",
          gameCurrentRound: currentRound,
          gameCurrentScore: currentScore,
        },
      })
    );
    isWinInTheRound.current = false;
  };
  const startGameCountdown = async () => {
    for (let i = 0; i < 4; i++) {
      dispatch(
        setRandomValueForSomeGame({
          0: {
            text: `Game Start In ${i}`,
            insertionRow: 0,
            type: "constantText",
          },
        })
      );
      await delayFunction(1000);
    }
    dispatch(
      setGameInfo({ ...gameInfoRef.current, isGameCountdownDone: true })
    );
  };
  const dPressHandler = (pressedKey) => {
    if (otherPressedKeys.current.length === 0) {
      otherPressedKeys.current = [pressedKey];
      return;
    }
    otherPressedKeys.current = [];
    jumpsNumRef.current = [];
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
    const numberOfRandomRow =
      randomValueForSomeGameRef.current?.currentRandomRow;
    if (
      gameInfoRef.current.isGameStarted &&
      cursorPosRef.current[0] === numberOfRandomRow
    ) {
      isWinInTheRound.current = true;
      clearInterval(gameLoopInterval.current);
      setNewGameLoopInterval();
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
          otherPressedKeys.current = [];
          changeCursorPlace(e.key);
        } else if (!isNaN(e.key)) {
          if (e.key !== "0" || jumpsNumRef.current.length > 0) {
            otherPressedKeys.current = [];
            jumpsNumRef.current = [...jumpsNumRef.current, e.key];
          }
        } else if (e.key === "d") {
          dPressHandler(e.key);
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
          dPressHandler(e.key);
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
