# Minesweeper

> **Note:** This repository was renamed from `React-Minesweeper` to `Minesweeper` on May 24, 2025. Please update your remote repository URL if you have cloned the old repo.

A community-driven, open-source reimagining of the classic Minesweeper experience. Built with thoughtful UX using modern front-end technologies including React, TypeScript, and Vite.

![preview](https://github.com/v-gajjar/Minesweeper/blob/main/src/assets/Minesweeper-16-06-2025.gif)

## ✨ Features

- 🎮 Three difficulty levels (Beginner, Intermediate, Expert)
- 🎨 Clean, modern UI with Phosphor Icons
- ⚡ Fast development with Vite and HMR
- 🧪 Comprehensive test coverage with Vitest
- 📱 Responsive design
- 🚀 Deployed on GitHub Pages

## 🎯 Live Demo

Try it out in your browser: [https://v-gajjar.github.io/Minesweeper/](https://v-gajjar.github.io/Minesweeper/)

## 🗺️ Roadmap

See the [Kanban Board](https://github.com/users/v-gajjar/projects/2) for a detailed view of what is under consideration, what is in progress, and what has been recently completed.

## 🛠️ Technology Stack

### Core
- **[React](https://reactjs.org/)** ^18.3.1 - JavaScript library for building component-based UIs
- **[TypeScript](https://www.typescriptlang.org/)** ^5.9.2 - Typed JavaScript for better development experience
- **[Vite](https://vitejs.dev/)** ^6.0.5 - Fast build tool and development server

### UI & Styling
- **[Phosphor Icons](https://phosphoricons.com/)** ^2.1.7 - Clean, modern SVG-based icon set
- **[classnames](https://www.npmjs.com/package/classnames)** ^2.5.1 - Utility for conditionally joining class names
- **[Radix UI](https://www.radix-ui.com/)** - Accessible UI components

### Routing
- **[React Router DOM](https://reactrouter.com/)** ^7.6.1 - Client-side routing

### Testing
- **[Vitest](https://vitest.dev/)** ^3.1.2 - Fast unit test framework
- **[Testing Library](https://testing-library.com/)** - React component testing utilities
- **[jsdom](https://github.com/jsdom/jsdom)** ^26.1.0 - JavaScript implementation of web standards

### Code Quality
- **[ESLint](https://eslint.org/)** ^9.34.0 - JavaScript/TypeScript linting
- **[Prettier](https://prettier.io/)** ^3.6.2 - Code formatting
- **[Stylelint](https://stylelint.io/)** ^16.21.0 - CSS linting


# Getting Started

### Clone the project

```
git clone https://github.com/v-gajjar/Minesweeper.git
```


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


## 📁 Project Structure

```
Minesweeper/
├── src/
│   ├── components/
│   │   └── feature/
│   │       ├── DifficultySelect/      # Difficulty selection component
│   │       ├── GameBoard/             # Main game board component
│   │       ├── GameDifficultySelector/ # Game difficulty selector
│   │       ├── GameResultModal/       # Modal for game results
│   │       ├── RemainingFlagsCounter/ # Flag counter display
│   │       └── ResultModal/           # Result modal component
│   ├── config/
│   │   ├── gameDifficultyLevelSettings.interfaces.ts
│   │   └── gameDifficultyLevelSettings.ts # Game difficulty configurations
│   ├── enum/
│   │   ├── GameDifficultyLevel.interfaces.ts
│   │   ├── GameDifficultyLevel.ts     # Difficulty level enums
│   │   ├── GameStatus.interfaces.ts
│   │   └── GameStatus.ts              # Game status enums
│   ├── utils/
│   │   ├── boardUtils.ts              # Board utility functions
│   │   ├── cellUtils.ts               # Cell utility functions
│   │   ├── mineUtils.ts               # Mine utility functions
│   │   └── index.ts                   # Utils barrel export
│   ├── assets/                        # Images and static assets
│   ├── App.tsx                        # Main App component
│   ├── App.css                        # App styles
│   ├── main.tsx                       # Application entry point
│   ├── index.css                      # Global styles
│   └── types.ts                       # TypeScript type definitions
├── tests/
│   └── unit/                          # Unit test files
│       ├── App.test.jsx
│       ├── Board.test.jsx
│       ├── Cell.test.jsx
│       ├── GameBoard.test.jsx
│       └── Win.test.jsx
├── public/                            # Public static files
├── eslint.config.js                   # ESLint configuration
├── vite.config.ts                     # Vite configuration
├── tsconfig.json                      # TypeScript configuration
├── package.json                       # Project dependencies and scripts
├── Dockerfile                         # Docker configuration
└── README.md                          # Project documentation
```

## 🧪 Available Scripts

| Command | Description |
| :------ | :---------- |
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint code with ESLint |
| `npm run lint:fix` | Lint and auto-fix issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run lint:css` | Lint CSS files |
| `npm run lint:css:fix` | Lint and fix CSS files |
| `npm run check` | Run format and lint checks |
| `npm run check:fix` | Format and fix all issues |
| `npm run deploy` | Deploy to GitHub Pages |


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


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

See [CONTRIBUTORS.md](https://github.com/v-gajjar/Minesweeper/blob/main/CONTRIBUTORS.md) for a detailed list of contributors.


## 🙏 Acknowledgements

A big thanks to the developers who have helped improve this project:

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
- [Amber Adamson](https://github.com/aadamsongit)


## 📝 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.


## 📚 Attributions

- Inter font by Rasmus Andersson - [SIL Open Font License 1.1](https://scripts.sil.org/OFL)


---

Made with ❤️ by the open-source community
