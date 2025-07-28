import type React from "react"
import type { CellData } from "../types"

export type CellProps = {
    cell: CellData,
    onClick: (event: React.MouseEvent<HTMLElement>) => void,
    onContextMenu: (event: React.MouseEvent<HTMLElement>) => void,
}
