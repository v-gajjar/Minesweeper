**Note:** This repository was renamed from `React-Minesweeper` to `Minesweeper` on May 24, 2025.  
Please update your remote repository URL if you have cloned the old repo.

# Description
A community-driven, open-source reimagining of the classic Minesweeper experience. Built with thoughtful UX, using modern front-end technologies including React and TypeScript.

 ![preview](https://github.com/v-gajjar/Minesweeper/blob/main/src/assets/Minesweeper-16-06-2025.gif)


# Live Demo
Try it out in a browser: [https://v-gajjar.github.io/Minesweeper/](https://v-gajjar.github.io/Minesweeper/)


# Roadmap

See the [Kanban Board](https://github.com/users/v-gajjar/projects/2) for a detailed view of what is under consideration, what is in progress, and what has been recently completed.


# Attributions

* Inter font by Rasmus Andersson - SIL Open Font License 1.1


# Acknowledgements
A big thanks to the kind contributions of developers who have helped improve the project!

 - [Heliomar Pena](https://www.linkedin.com/in/heliomar/)
 - [BJ Rutledge](https://www.linkedin.com/in/bj-rutledge/)
 - [James Blaskett](https://www.linkedin.com/in/james-blaskett/)
 - [Umer Farooq Mala](https://github.com/umermala)
 - [Nick Clark](https://github.com/NickTheDevOpsGuy)
 - [Daniela Grothe](https://www.linkedin.com/in/daniela-grothe-743ab8235/)
 - [Velimir Đurković](https://www.linkedin.com/in/djvelimir/)
 - [Tawheed Ahmed](https://www.linkedin.com/in/tawheed-ahmed-dev/)
 - [Brenda Hensley](https://www.linkedin.com/in/brenda-hensley-/)
 - [Gavin Hensley](https://www.linkedin.com/in/g-hensley/)
 - [Engombe Lokanga](https://www.linkedin.com/in/engombelokanga/)


See a more detailed list [here](https://github.com/v-gajjar/Minesweeper/blob/main/CONTRIBUTORS.md)


# Getting Started

### Dependencies

| Name                                                                  | Version | Description                                                 |
| :-------------------------------------------------------------------- | :------ | :---------------------------------------------------------- |
| [React](https://reactjs.org/)                                         | ^18.3.1 | JavaScript library for building component-based UIs.        |
| [Vite](https://vitejs.dev/)                                           | ^6.0.5  | Fast build tool and development server for modern web apps. |
| [classnames](https://www.npmjs.com/package/classnames)                | ^2.5.1  | Utility for conditionally joining class names together.     |
| [Phosphor Icons](https://www.npmjs.com/package/@phosphor-icons/react) | ^2.1.7  | Clean, modern SVG-based icon set.                           |



### Clone the project

```
git clone https://github.com/v-gajjar/Minesweeper.git
```

---

### 📂 Project Structure

<details>
<summary>📁 Click to expand project file structure</summary>

```plaintext
.
├── .github
│   ├── pull_request_template.md
│   └── workflows
│       ├── build-checks.yaml
│       ├── whats-new-merged.yaml
│       └── whats-new-preview.yaml
├── .gitignore
├── .prettierignore
├── .prettierrc.yml
├── .stylelintrc.json
├── CONTRIBUTORS.md
├── Dockerfile
├── eslint.config.js
├── globals.d.ts
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── Minesweeper-16-06-2025.gif
│   ├── components
│   │   └── feature
│   │       ├── Cell
│   │       ├── GameBoard
│   │       ├── GameDifficultySelector
│   │       ├── GameResultModal
│   │       └── RemainingFlagsCounter
│   ├── config
│   │   ├── gameDifficultyLevelSettings.interfaces.ts
│   │   └── gameDifficultyLevelSettings.ts
│   ├── enum
│   │   ├── GameDifficultyLevel.interfaces.ts
│   │   ├── GameDifficultyLevel.ts
│   │   ├── GameStatus.interfaces.ts
│   │   └── GameStatus.ts
│   ├── index.css
│   ├── main.tsx
│   ├── minesweeperUtils.js
│   ├── types.ts
│   └── vite-env.d.ts
├── tests
│   └── unit
│       ├── App.test.jsx
│       ├── Board.test.jsx
│       ├── Cell.test.jsx
│       ├── GameBoard.test.jsx
│       └── Win.test.jsx
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

</details>

---


### Running locally via NPM
1. Navigate to the project directory:
   ```
   cd Minesweeper
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Start the dev server
   ```
   npm run dev
   ```
4. Accessing on a browser (The localhost port will usually be 5173, but it should be logged to the console)
   ```
   http://localhost:5173/
   ```
   

### Running via Docker
1. Docker Image

```
docker build -t minesweeper:v1 .
```

2. Running via Docker

```
docker run -itd -p 8083:80 --name minesweeper minesweeper:v1
```

3. Accessing on browser

The above docker run command maps port 80 of docker container to port 8083 of the host. The host port can be changed as per the user's need. The application will be accessible on browser at http://localhost:8083 in the above case.


# How to Play

- By default, all cells are closed. A number of mines will be randomly distributed across the cells. 

- The objective of the game is to open all cells that don't contain a mine.

- If you suspect a cell has a mine, you can "flag" the cell using right click. This will display a flag on the cell. 

- You can flag as many cells as you want. 

- You can open a cell using left click, however if you open a mine, the game is over.
  
- If you lose the game, incorrectly placed flags will be replaced with a cross, correctly placed flags will remain, and mines hidden in any other cells will be revealed. 

- The number on a cell is the number of mines hidden within the 8 cells that surround it. 

- To make the game fairer, mines will not be distributed until the first left-click and won't be placed on the first cell that you open. 


### Difficulty Levels

There are currently three difficulty settings:

| Level        | Board Size            | Number of Mines |
| :----------- | :-------------------- | :-------------- |
| Beginner     | 9 rows x 9 columns    | 10              |
| Intermediate | 16 rows x 16 columns  | 40              |
| Expert       | 16 rows x 30 columns  | 80              |




   
   
