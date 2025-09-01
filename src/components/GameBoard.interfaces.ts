import type { BoardData, BoardSize } from '../types';

export type GameBoardProps = {
  board: BoardData;
  boardSize: BoardSize;
  onMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
  onTouchStart: (event: React.TouchEvent<HTMLElement>) => void;
  onMouseUp: (event: React.MouseEvent<HTMLElement>) => void;
  onTouchEnd: (event: React.TouchEvent<HTMLElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLElement>) => void;
  onTouchCancel: (event: React.TouchEvent<HTMLElement>) => void;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onContextMenu: (event: React.MouseEvent<HTMLElement>) => void;
};
