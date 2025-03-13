
 ![preview](https://github.com/v-gajjar/React-Minesweeper/blob/main/src/assets/Minesweeper-image.png)


# Dependencies

| Name | License | 
| :--- | :--- | 
| React | MIT |
| Vite | MIT |
| Classnames | MIT | 
| Phosphor Icons | MIT | 


# Attributions
* Inter font by Rasmus Andersson - SIL Open Font License 1.1

# Development Roadmap
Current focus; refactoring the logic to extract core gameplay related functionality to seperate concerns into pure functions

Next step: refactoring to replace the usage of term "Tile" with the more standard term "Cell"

See full ![roadmap](https://github.com/v-gajjar/React-Minesweeper/blob/main/ROADMAP.md)

# Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/v-gajjar/React-Minesweeper.git
   ```
2. Navigate to the project directory:
   ```
   cd React-Minesweeper
   ```
3. Install dependencies
   ```
   npm install
   ```
4. Run
   ```
   npm run dev
   ```
# Gameplay

- By default, all tiles are closed. A number of mines will be randomly distributed across the tiles. 

- The objective of the game is to open all tiles that don't contain a mine.

- If you suspect a tile has a mine, you can "flag" the tile using right click. This will display a flag on the tile. 

- You can flag as many tiles as you want. 

- You can open a tile using left click, however if you open a mine, the game is over.
  
- If you lose the game, incorrectly placed flags will be replaced with a cross, correctly placed flags will remain, and mines hidden in any other tiles will be revealed. 

- The number on a tile is the number of mines hidden within the 8 tiles that surround it. 

- To make the game fairer, mines will not be distrubuted until the first left-click and won't be placed on the first tile that you open. 

## Game Difficulty Settings

There are currently three difficulty settings
| level | board size | number of mines |
| :--- | :--- | :--- |
| easy | 9 rows by 9 columns | 10
| medium | 16 rows by 16 columns | 40
| hard | 16 rows by 30 columns | 80





   
   
   
