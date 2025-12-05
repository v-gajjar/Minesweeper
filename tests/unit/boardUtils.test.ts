import { describe, it } from 'vitest';
import { getBoard } from '../../src/utils/boardUtils';
import type { BoardData, BoardSize } from '../../src/types';

describe('boardUtils', () => {
    describe('getBoard', () => {
        it('should create a new board with the correct dimensions', () => {
            const boardSize: BoardSize = { rowCount: 6, columnCount: 8 };
            const board: BoardData = getBoard(boardSize);

            expect(board.length).toBe(6);
            expect(board[0].length).toBe(8);
        });
    })
});