import type { GameStatusMap } from "./GameStatus.interfaces";

const GameStatus: GameStatusMap = {
  GAME_NOT_STARTED: 1,
  GAME_IN_PROGRESS: 2,
  GAME_LOST: 3,
  GAME_WON: 4,
};

export default GameStatus;
