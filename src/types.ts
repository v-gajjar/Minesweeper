export type CellI = {
    hasMine: boolean,
    hasExplodedMine: boolean,
    isFlagged: boolean,
    isRevealed: boolean,
    isIncorrectlyFlagged: boolean,
    adjacentMinesCount: number,
    x: number,
    y: number
}

export type BoardI = CellI[][];

export type BoardSizeI = {
    rowCount: number,
    columnCount: number,
}

export type LocationI = {
    x: number,
    y: number,
}

export type LocationColRowI = {
    col: string,
    row: string,
}

export type FlagLocationsI = LocationI[];
export type MineLocations = LocationI[];
