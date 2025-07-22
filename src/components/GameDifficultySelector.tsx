import React from "react";
import { GameDifficultyLevel } from "../enum/GameDifficultyLevel";

type Props = {
  gameDifficultyLevel: GameDifficultyLevel;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const GameDifficultySelector: React.FC<Props> = ({
  gameDifficultyLevel,
  onChange,
}) => {
  return (
    <label>
      Difficulty:
      <select value={gameDifficultyLevel} onChange={onChange}>
        <option value={GameDifficultyLevel.EASY}>Easy</option>
        <option value={GameDifficultyLevel.MEDIUM}>Medium</option>
        <option value={GameDifficultyLevel.HARD}>Hard</option>
      </select>
    </label>
  );
};

export default GameDifficultySelector;
