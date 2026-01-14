import { describe, it, expect } from 'vitest';
import {
  getBoard,
  updateBoard,
  isOffBoard,
  getGameLostBoard,
} from '@/utils/boardUtils';
import type { BoardData, BoardSize, CellData } from '@/types';

describe('boardUtils', () => {
  describe('getBoard', () => {
    it('should create a new board with the correct dimensions', () => {
      const boardSize: BoardSize = { rowCount: 6, columnCount: 8 };
      const board: BoardData = getBoard(boardSize);

      expect(board.length).toBe(6);
      expect(board[0].length).toBe(8);
    });
  });

  describe('updateBoard', () => {
    it('should update the board with the provided cells', () => {
      const initialBoard: BoardData = getBoard({ rowCount: 3, columnCount: 3 });
      const updatedCells: CellData[] = [
        {
          x: 0,
          y: 0,
          isRevealed: true,
          hasMine: false,
          isFlagged: false,
          adjacentMinesCount: 1,
          hasExplodedMine: false,
          isIncorrectlyFlagged: false,
        },
        {
          x: 1,
          y: 1,
          isRevealed: true,
          hasMine: false,
          isFlagged: false,
          adjacentMinesCount: 2,
          hasExplodedMine: false,
          isIncorrectlyFlagged: false,
        },
        {
          x: 2,
          y: 2,
          isRevealed: false,
          hasMine: false,
          isFlagged: false,
          adjacentMinesCount: 0,
          hasExplodedMine: false,
          isIncorrectlyFlagged: false,
        },
      ];

      const updatedBoard: BoardData = updateBoard(initialBoard, updatedCells);

      expect(updatedBoard[0][0].isRevealed).toBe(true);
      expect(updatedBoard[1][1].adjacentMinesCount).toBe(2);
      expect(updatedBoard[1][0].hasMine).toBe(false);
    });

    it('should verfy non-updated cells remain unchanged after applying updatedCells', () => {
        const initialBoard: BoardData = getBoard({ rowCount: 4, columnCount: 4 });  
        const updatedCells: CellData[] = [
          {
            x: 0,
            y: 0,
            isRevealed: true,
            hasMine: false,
            isFlagged: false,
            adjacentMinesCount: 1,
            hasExplodedMine: false,
            isIncorrectlyFlagged: false,
          },
        ];
    
        const updatedBoard: BoardData = updateBoard(initialBoard, updatedCells);
    
        expect(updatedBoard[0][0].isRevealed).toBe(true);
        expect(updatedBoard[0][1].isRevealed).toBe(false);
        expect(updatedBoard[1][0].isRevealed).toBe(false);
        expect(updatedBoard[1][1].isRevealed).toBe(false);
      });
  });

  describe('isOffBoard', () => {
    it('should return true for coordinates outside the board', () => {
      const boardSize: BoardSize = { rowCount: 5, columnCount: 5 };

      expect(isOffBoard(-1, 0, boardSize)).toBe(true);
      expect(isOffBoard(0, -1, boardSize)).toBe(true);
    });

    it('should return false for coordinates inside the board', () => {
      const boardSize: BoardSize = { rowCount: 5, columnCount: 5 };

      expect(isOffBoard(0, 0, boardSize)).toBe(false);
      expect(isOffBoard(2, 2, boardSize)).toBe(false);
    });
  });

  describe('getGameLostBoard', () => {
    it('should return a board with revealed mines and incorrectly flagged cells', () => {
      const initialBoard: BoardData = getBoard({ rowCount: 3, columnCount: 3 });

      initialBoard[0][0] = {
        x: 0,
        y: 0,
        isRevealed: false,
        hasMine: true,
        isFlagged: false,
        adjacentMinesCount: 0,
        hasExplodedMine: false,
        isIncorrectlyFlagged: false,
      };
      initialBoard[1][1] = {
        x: 1,
        y: 1,
        isRevealed: false,
        hasMine: false,
        isFlagged: true,
        adjacentMinesCount: 1,
        hasExplodedMine: false,
        isIncorrectlyFlagged: false,
      };
      initialBoard[2][2] = {
        x: 2,
        y: 2,
        isRevealed: false,
        hasMine: false,
        isFlagged: false,
        adjacentMinesCount: 0,
        hasExplodedMine: false,
        isIncorrectlyFlagged: false,
      };

      const mineLocations = [{ x: 0, y: 0 }];
      const flagLocations = [{ x: 1, y: 1 }];

      const gameLostBoard: BoardData = getGameLostBoard(
        initialBoard,
        mineLocations,
        flagLocations
      );

      expect(gameLostBoard[0][0].isRevealed).toBe(true);
      expect(gameLostBoard[2][2].isRevealed).toBe(false);
      expect(gameLostBoard[1][1].isIncorrectlyFlagged).toBe(true);
      expect(gameLostBoard[0][0].hasExplodedMine).toBe(false);
    });
  });

  it ('should verify a flagged mine is not revealed (mines that are flagged should be skipped', () => {
    const initialBoard: BoardData = getBoard({ rowCount: 5, columnCount: 5 });

    initialBoard[0][0] = {
      x: 0,
      y: 0,
      isRevealed: false,
      hasMine: true,
      isFlagged: true,
      adjacentMinesCount: 0,
      hasExplodedMine: false,
      isIncorrectlyFlagged: false,
    };

    const mineLocations = [{ x: 0, y: 0 }];
    const flagLocations = [{ x: 0, y: 0 }];

    const gameLostBoard: BoardData = getGameLostBoard(
      initialBoard,
      mineLocations,
      flagLocations
    );

    expect(gameLostBoard[0][0].isRevealed).toBe(false);
    expect(gameLostBoard[0][0].hasExplodedMine).toBe(false);
  });

  it ('should verify a flagged mine is not marked incorrectly flagged (only non-mine flags should be marked incorrect', () => {
    const initialBoard: BoardData = getBoard({ rowCount: 5, columnCount: 5 });

    initialBoard[0][0] = {
      x: 0,
      y: 0,
      isRevealed: false,
      hasMine: true,
      isFlagged: true,
      adjacentMinesCount: 0,
      hasExplodedMine: false,
      isIncorrectlyFlagged: false,
    };

    const mineLocations = [{ x: 0, y: 0 }];
    const flagLocations = [{ x: 0, y: 0 }];

    const gameLostBoard: BoardData = getGameLostBoard(
      initialBoard,
      mineLocations,
      flagLocations
    );

    expect(gameLostBoard[0][0].isIncorrectlyFlagged).toBe(false);
  });
});
