import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import GameGrid from "./components/GameGrid";
import { selectCursorPos, setNewValue } from "./features/cursorPosSlice";
import {
  selectGameInfo,
  setGameInfo,
  resitGameInfo,
} from "./features/gameInfoSlice";
import HOME_OPTIONS from "./homeOptions.js";
import {
  selecteRandomValueForSomeGame,
  setRandomValueForSomeGame,
} from "./features/randomValueForSomeGameSlice";
import DIFFICULTY_SETTING from "./difficultySetting";
import END_OF_THE_GAME_OPTIONS from "./endOfTheGameOptions";
import {
  INSERTION_COL,
  NUMBER_OF_ROUNDES,
  NUM_OF_COLS,
  NUM_OF_ROWS,
} from "./constantValues";
import { setEndOfTheGameStatis } from "./features/endOfTheGameStatisSlice";

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
  const isTheCurrsorInTheRightPosition = useRef(true);
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
        if (!gameInfo.isGameRunning) {
          dispatch(
            setGameInfo({ ...gameInfoRef.current, isGameRunning: true })
          );
          setTimeout(() => {
            setNewGameLoopInterval();
          });
        }
      }
    } else {
      clearInterval(gameLoopInterval.current);
    }
  }, [gameInfo]);
  const setNewGameLoopInterval = () => {
    function helper() {
      if (gameInfoRef.current.isRandomMode) {
        const randomGame = getRandomGame();
        dispatch(
          setGameInfo({
            ...gameInfoRef.current,
            gameType: randomGame.gameType,
            gameText: randomGame.gameText,
          })
        );
      }
      setTimeout(() => {
        changeTheRandomValueForSomeGame();
      });
    }
    helper();
    gameLoopInterval.current = setInterval(() => {
      helper();
    }, DIFFICULTY_SETTING[gameInfoRef.current.gameDifficulty]?.roundTime * 1000);
  };
  const getRandomGame = () => {
    let availableGames = [];
    for (let key in HOME_OPTIONS) {
      if (
        HOME_OPTIONS[key].type === "game" &&
        HOME_OPTIONS[key].gameType !== "random"
      ) {
        availableGames.push(HOME_OPTIONS[key]);
      }
    }
    return availableGames[Math.floor(Math.random() * availableGames.length)];
  };
  const changeTheRandomValueForSomeGame = () => {
    const randomRow = Math.floor(Math.random() * 12) + 1;
    const randomCol = ["hjkl"].includes(gameInfoRef.current?.gameType)
      ? Math.floor(Math.random() * 12) + INSERTION_COL
      : INSERTION_COL;
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
    if (currentRound === NUMBER_OF_ROUNDES) {
      dispatch(
        setGameInfo({
          ...gameInfoRef.current,
          isGameStarted: false,
          isEndGameOptinsOpen: true,
        })
      );
      dispatch(
        setEndOfTheGameStatis({
          ...END_OF_THE_GAME_OPTIONS,
          0: {
            text: `Round ${currentRound}/${NUMBER_OF_ROUNDES}`,
            insertionRow: 0,
            type: "statisText",
            insertionCol: INSERTION_COL,
          },
          1: {
            text: `${currentScore}/${NUMBER_OF_ROUNDES} completed successfully`,
            insertionRow: 1,
            type: "statisText",
            insertionCol: INSERTION_COL,
          },
          2: {
            text: `Game Type ${
              gameInfoRef.current?.isRandomMode
                ? "random"
                : gameInfoRef.current?.gameType
            }`,
            insertionRow: 2,
            type: "statisText",
            insertionCol: INSERTION_COL,
          },
          3: {
            text: `Game Difficulty ${gameInfoRef.current?.gameDifficulty}`,
            insertionRow: 3,
            type: "statisText",
            insertionCol: INSERTION_COL,
          },
        })
      );
    }
    dispatch(
      setRandomValueForSomeGame({
        0: {
          text: `Round ${currentRound}/${NUMBER_OF_ROUNDES}`,
          insertionRow: 0,
          type: "constantText",
          insertionCol: INSERTION_COL,
        },
        currentRandomRow: randomRow,
        [randomRow]: {
          text: gameInfoRef.current.gameText,
          insertionRow: randomRow,
          insertionCol: randomCol,
          type: "randomValueForSomeGame",
          gameCurrentRound: currentRound,
          gameCurrentScore: currentScore,
        },
      })
    );
    isWinInTheRound.current = false;
  };
  const startGameCountdown = async () => {
    for (let i = 3; i >= 0; i--) {
      dispatch(
        setRandomValueForSomeGame({
          0: {
            text: `Game Start In ${i}`,
            insertionRow: 0,
            type: "constantText",
            insertionCol: INSERTION_COL,
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
      !gameInfoRef.current.isEndGameOptinsOpen &&
      cursorPosRef.current[0] in HOME_OPTIONS
    ) {
      if (HOME_OPTIONS[cursorPosRef.current[0]].type === "game") {
        const randomGame = getRandomGame();
        const [gameType, gameText] =
          HOME_OPTIONS[cursorPosRef.current[0]].gameType === "random"
            ? [randomGame.gameType, randomGame.gameText]
            : [
                HOME_OPTIONS[cursorPosRef.current[0]].gameType,
                HOME_OPTIONS[cursorPosRef.current[0]].gameText,
              ];
        dispatch(
          setGameInfo({
            ...gameInfoRef.current,
            isGameStarted: true,
            gameType: gameType,
            gameText: gameText,
            isRandomMode:
              HOME_OPTIONS[cursorPosRef.current[0]].gameType === "random",
          })
        );
      } else if (HOME_OPTIONS[cursorPosRef.current[0]].type === "difficulty") {
        dispatch(
          setGameInfo({
            ...gameInfoRef.current,
            gameDifficulty:
              HOME_OPTIONS[cursorPosRef.current[0]].gameDifficulty,
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
      winInTheRoundHandler();
      return;
    }
    if (
      gameInfoRef.current.isEndGameOptinsOpen &&
      cursorPosRef.current[0] in END_OF_THE_GAME_OPTIONS
    ) {
      if (END_OF_THE_GAME_OPTIONS[cursorPosRef.current[0]].type === "menu") {
        dispatch(resitGameInfo());
        /* dispatch(resitRandomValueForSomeGame()); */
      } else if (
        END_OF_THE_GAME_OPTIONS[cursorPosRef.current[0]].type === "replay"
      ) {
        dispatch(
          setGameInfo({
            ...gameInfoRef.current,
            isGameStarted: true,
            isEndGameOptinsOpen: false,
            isGameCountdownDone: false,
            isGameRunning: false,
          })
        );
      } else if (
        END_OF_THE_GAME_OPTIONS[cursorPosRef.current[0]].type === "quit"
      ) {
        window.close();
      }
      return;
    }
  };
  const xPressHandler = () => {
    const numberOfRandomRow =
      randomValueForSomeGameRef.current?.currentRandomRow;
    const numberOfRandomCol =
      randomValueForSomeGameRef.current[numberOfRandomRow]?.insertionCol;
    if (
      gameInfoRef.current.isGameStarted &&
      gameInfoRef.current.gameType === "hjkl" &&
      cursorPosRef.current[0] === numberOfRandomRow &&
      cursorPosRef.current[1] === numberOfRandomCol
    ) {
      winInTheRoundHandler();
      return;
    }
  };
  const winInTheRoundHandler = () => {
    isWinInTheRound.current = true;
    clearInterval(gameLoopInterval.current);
    setNewGameLoopInterval();
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
  const allPressedButtonsHandler = (e) => {
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
      jumpsNumRef.current = [];
    } else if (e.key === "x") {
      otherPressedKeys.current = [];
      jumpsNumRef.current = [];
      xPressHandler();
    }
  };
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      document.addEventListener("keypress", (e) => {
        if (isTheCurrsorInTheRightPosition.current) {
          isTheCurrsorInTheRightPosition.current = false;
          setTimeout(() => {
            isTheCurrsorInTheRightPosition.current = true;
            allPressedButtonsHandler(e);
          }, 0);
        }
      });
    }
    return () => {
      document.removeEventListener("keyup", (e) => {
        if (isTheCurrsorInTheRightPosition.current) {
          isTheCurrsorInTheRightPosition.current = false;
          setTimeout(() => {
            isTheCurrsorInTheRightPosition.current = true;
            allPressedButtonsHandler(e);
          }, 0);
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
