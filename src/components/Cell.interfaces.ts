import type React from "react"
import type { CellI } from "../types"

export type CellProps = {
    cell: CellI,
    onClick: (event: React.MouseEvent<HTMLElement>) => void,
    onContextMenu: (event: React.MouseEvent<HTMLElement>) => void,
}
