import type { GameDifficultyLevel, GameDifficultyLevelKeys } from "../enum/GameDifficultyLevel.interfaces"
import type { BoardSize } from "../types"

export type GameDifficultyLevelSettings = {
    [key in GameDifficultyLevelKeys]: {
        level: GameDifficultyLevel[GameDifficultyLevelKeys],
        boardSize: BoardSize,
        mineCount: number,
        label: string,
    }
}
