// tests/mocks/boardMocks.js

/**
 * Shared mock factories for MindSweeper board tests.
 * Ensures consistent test data across all test files.
 */

/**
 * Creates a mock cell with default values.
 * @param {number} x - Row index
 * @param {number} y - Column index
 * @param {object} overrides - Optional properties to override defaults
 * @returns {object} Mock cell object
 */
export const createMockCell = (x, y, overrides = {}) => ({
  x,
  y,
  isRevealed: false,
  hasMine: false,
  neighborMines: 0,
  isFlagged: false,
  ...overrides,
});

/**
 * Creates a mock board (2D array of cells).
 * @param {number} rows - Number of rows
 * @param {number} cols - Number of columns
 * @param {object} cellOverrides - Optional properties to apply to all cells
 * @returns {array} 2D array of mock cells
 */
export const createMockBoard = (rows, cols, cellOverrides = {}) =>
  Array.from({ length: rows }, (_, x) =>
    Array.from({ length: cols }, (_, y) => createMockCell(x, y, cellOverrides))
  );

/**
 * Creates a mock board size configuration.
 * @param {number} rows - Number of rows
 * @param {number} cols - Number of columns
 * @returns {object} Board size object with rowCount and columnCount
 */
export const createMockBoardSize = (rows, cols) => ({
  rowCount: rows,
  columnCount: cols,
});