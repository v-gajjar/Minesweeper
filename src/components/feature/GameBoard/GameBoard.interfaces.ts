import type { BoardData, BoardSize } from '@/types';
import type { CellProps } from '@/components/feature/GameBoard/Cell/Cell.interfaces';

export type GameBoardProps = {
  board: BoardData;
  boardSize: BoardSize;
  onClick: CellProps['onClick'];
  onContextMenu: CellProps['onContextMenu'];
};
