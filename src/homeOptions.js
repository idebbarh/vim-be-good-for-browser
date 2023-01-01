const HOME_OPTIONS = {
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
    gameText: "DELETE_ME",
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
export default HOME_OPTIONS;
