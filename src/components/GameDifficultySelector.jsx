import GameDifficultyLevel from "../enum/GameDifficultyLevel";

function GameDifficultySelector({gameDifficultySettings, onChange}) {

    return (
        <div className='game-difficulty-select-wrapper'>
        <label>Select game difficulty: </label>
        <select 
            value={gameDifficultySettings.level}
            onChange={onChange}
            name="game-difficulty-select" 
            id="game-difficulty-select"
        > 
        <option value={GameDifficultyLevel.EASY}>Beginnner</option>
        <option value={GameDifficultyLevel.MEDIUM}>Intermediate</option>
        <option value={GameDifficultyLevel.HARD}>Advance</option>
      </select>
    </div>
    );
}

export default GameDifficultySelector;
