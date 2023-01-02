import { INSERTION_COL } from "./constantValues";

const END_OF_THE_GAME_OPTIONS = {
  8: {
    text: "Where do you wnat to go next? (Delete Line)",
    insertionRow: 8,
    type: "title",
    insertionCol: INSERTION_COL,
  },
  9: {
    text: "Menu",
    insertionRow: 9,
    type: "menu",
    insertionCol: INSERTION_COL,
  },
  10: {
    text: "Replay",
    insertionRow: 10,
    type: "replay",
    insertionCol: INSERTION_COL,
  },
  11: {
    text: "Quit",
    insertionRow: 11,
    type: "quit",
    insertionCol: INSERTION_COL,
  },
};
export default END_OF_THE_GAME_OPTIONS;
