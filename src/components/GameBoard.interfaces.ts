import type { BoardI, BoardSizeI } from "../types"
import type { CellProps } from "./Cell.interfaces"

export type GameBoardProps = {
    board: BoardI,
    boardSize: BoardSizeI
    onClick: CellProps['onClick'],
    onContextMenu: CellProps['onContextMenu'],
}
