import { GAME_DIFFICULTY_LEVEL_SETTINGS } from "../config/gameDifficultyLevelSettings";

function GameDifficultySelector({gameDifficultySettings, onChange}) {

    return (
        <div className='game-difficulty-select-wrapper'>
        <label>Difficulty: </label>
        <select 
            value={gameDifficultySettings.level}
            onChange={onChange}
            name="game-difficulty-select" 
            id="game-difficulty-select"
            data-testid="difficulty-select"
        > 
        {Object.keys(GAME_DIFFICULTY_LEVEL_SETTINGS).map((setting, i) => (
            <option 
                key={i}
                value={GAME_DIFFICULTY_LEVEL_SETTINGS[setting].level}
            >{GAME_DIFFICULTY_LEVEL_SETTINGS[setting].label}</option>
        ))}
      </select>
    </div>
    );
}

export default GameDifficultySelector;
