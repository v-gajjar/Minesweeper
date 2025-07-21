export type GameStatusKeysI = "GAME_NOT_STARTED" | "GAME_IN_PROGRESS" | "GAME_LOST" | "GAME_WON";

export type GameStatusI = Record<GameStatusKeysI, number>

