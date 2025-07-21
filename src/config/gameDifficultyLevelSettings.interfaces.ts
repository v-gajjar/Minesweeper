import type { GameDifficultyLevelI, GameDifficultyLevelKeysI } from "../enum/GameDifficultyLevel.interfaces"
import type { BoardSizeI } from "../types"

export type GameDifficultyLevelSettingsI = {
    [key in GameDifficultyLevelKeysI]: {
        level: GameDifficultyLevelI[GameDifficultyLevelKeysI],
        boardSize: BoardSizeI,
        mineCount: number,
        label: string,
    }
}
