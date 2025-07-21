import type { GameDifficultyLevelSettingsI } from "../config/gameDifficultyLevelSettings.interfaces"

export type GameDifficultySelectorProps = {
    gameDifficultySettings: GameDifficultyLevelSettingsI[keyof GameDifficultyLevelSettingsI],
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}
