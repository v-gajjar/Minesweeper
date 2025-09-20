import type { BoardData, BoardSize } from '../../../types';
import type { CellProps } from '../Cell/Cell.interfaces';

export type GameBoardProps = {
  board: BoardData;
  boardSize: BoardSize;
  onClick: CellProps['onClick'];
  onContextMenu: CellProps['onContextMenu'];
};
