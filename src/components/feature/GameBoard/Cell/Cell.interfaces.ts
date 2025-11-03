import type React from 'react';
import type { CellData } from '@/types';

export type CellProps = {
  cell: CellData;
  onClick: (x: number, y: number) => void;
  onContextMenu: (x: number, y: number, event: React.SyntheticEvent) => void;
};
