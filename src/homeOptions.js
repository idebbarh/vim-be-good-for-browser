import { INSERTION_COL } from "./constantValues";

const HOME_OPTIONS = {
  1: {
    text: "VimBeGood is a collection of small games for neovim which are",
    insertionRow: 1,
    type: "title",
    insertionCol: INSERTION_COL,
  },
  2: {
    text: "intended to help you improve your vim proficiency.",
    insertionRow: 2,
    type: "title",
    insertionCol: INSERTION_COL,
  },
  3: {
    text: "delete a line to select the line.  If you delete a difficulty,",
    insertionRow: 3,
    type: "title",
    insertionCol: INSERTION_COL,
  },
  4: {
    text: "it will select that difficulty, but if you delete a game it",
    insertionRow: 4,
    type: "title",
    insertionCol: INSERTION_COL,
  },
  5: {
    text: "will start the game.",
    insertionRow: 5,
    type: "title",
    insertionCol: INSERTION_COL,
  },
  7: {
    text: "Select a Game (delete from the list to select)",
    insertionRow: 7,
    type: "title",
    insertionCol: INSERTION_COL,
  },
  8: {
    text: "----------------------------------------------",
    insertionRow: 8,
    type: "title",
    insertionCol: INSERTION_COL,
  },
  9: {
    text: "[*] relative",
    insertionRow: 9,
    type: "game",
    gameType: "relative",
    gameText: "DELETE_ME",
    insertionCol: INSERTION_COL,
  },
  /* 10: { */
  /*   text: "[*] ci", */
  /*   insertionRow: 10, */
  /*   type: "game", */
  /*   gameType: "ci", */
  /*   insertionCol: INSERTION_COL, */
  /* }, */

  /* 11: { */
  /*   text: "[*] words", */
  /*   insertionRow: 11, */
  /*   type: "game", */
  /*   gameType: "words", */
  /*   insertionCol: INSERTION_COL, */
  /* }, */
  10: {
    text: "[*] hjkl",
    insertionRow: 10,
    type: "game",
    gameType: "hjkl",
    gameText: "X",
    insertionCol: INSERTION_COL,
  },
  11: {
    text: "[*] random",
    insertionRow: 11,
    type: "game",
    gameType: "random",
    insertionCol: INSERTION_COL,
  },
  /* 14: { */
  /*   text: "[*] whackamole", */
  /*   insertionRow: 14, */
  /*   type: "game", */
  /*   gameType: "whackamole", */
  /*   insertionCol: INSERTION_COL, */
  /* }, */

  13: {
    text: "Select a Difficulty (delete from the list to select)",
    insertionRow: 13,
    type: "title",
    insertionCol: INSERTION_COL,
  },
  14: {
    text: "----------------------------------------------------",
    insertionRow: 14,
    type: "title",
    insertionCol: INSERTION_COL,
  },
  15: {
    text: "[*] noob",
    insertionRow: 15,
    type: "difficulty",
    gameDifficulty: "noob",
    insertionCol: INSERTION_COL,
  },
  16: {
    text: "[*] easy",
    insertionRow: 16,
    type: "difficulty",
    gameDifficulty: "easy",
    insertionCol: INSERTION_COL,
  },
  17: {
    text: "[*] medium",
    insertionRow: 17,
    type: "difficulty",
    gameDifficulty: "medium",
    insertionCol: INSERTION_COL,
  },
  18: {
    text: "[*] hard",
    insertionRow: 18,
    type: "difficulty",
    gameDifficulty: "hard",
    insertionCol: INSERTION_COL,
  },
  19: {
    text: "[*] nightmare",
    insertionRow: 19,
    type: "difficulty",
    gameDifficulty: "nightmare",
    insertionCol: INSERTION_COL,
  },
  20: {
    text: "[*] tpope",
    insertionRow: 20,
    type: "difficulty",
    gameDifficulty: "tpope",
    insertionCol: INSERTION_COL,
  },
};
export default HOME_OPTIONS;
