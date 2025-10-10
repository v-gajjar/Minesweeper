# Minesweeper

![License](https://img.shields.io/github/license/v-gajjar/Minesweeper)
![Contributors](https://img.shields.io/github/contributors/v-gajjar/Minesweeper)
![Last Commit](https://img.shields.io/github/last-commit/v-gajjar/Minesweeper)
![Stars](https://img.shields.io/github/stars/v-gajjar/Minesweeper?style=social)

![preview](https://github.com/v-gajjar/Minesweeper/blob/main/src/assets/Minesweeper-16-06-2025.gif)

**Play now:** [Live Demo](https://v-gajjar.github.io/Minesweeper/)  

---

## About

A modern, open-source remix of the classic Minesweeper, powered by today’s tech and tomorrow’s UX standards.

We’re not just cloning nostalgia we’re reinventing it. Expect clean design, fluid gameplay, and a welcoming home screen that helps new players learn fast and lets veterans dive straight into “Play Now.”

---

## Roadmap

![UI Flow Diagram](./src/assets/ui-flow.png)

We’re actively evolving this game! Some upcoming ideas:  

- Smooth gameplay with customizable difficulty levels
- Dark mode and ongoing UX polish
- Sounds, timers, and extra UX features for immersion
- Accessibility, themes, and multi-language support
- Touch controls optimized for mobile & tablets
- Keyboard navigation for power players
- New home screen with light/dark themes & quick actions


See the [Kanban Board](https://github.com/users/v-gajjar/projects/2) or [open issues](https://github.com/v-gajjar/Minesweeper/issues) for the full list.  

---

## Contributing

We love contributions of all kinds! Whether it’s fixing a bug, suggesting a feature, or polishing docs, your help makes this game better.  

How to join in:  
- Fork & open a PR 
- Add yourself to [Contributors](./CONTRIBUTORS.md)
- Share ideas in [roadmap discussions](https://github.com/users/v-gajjar/projects/2)  
- Report bugs via [Issues](https://github.com/v-gajjar/Minesweeper/issues)

Every contribution, big or small, helps keep this project alive 🎉

---

## Acknowledgements

Minesweeper is a community project, shaped by everyone who’s played, tested, and contributed.  
Every commit, idea, and bug report makes the game better.  

[![Contributors](https://contrib.rocks/image?repo=v-gajjar/Minesweeper)](./CONTRIBUTORS.md)  

Meet all our amazing [Contributors](./CONTRIBUTORS.md)

---

## How to Play

Uncover all safe cells without clicking on a mine 💣

- **Flag suspected mines:** Right-click a cell to place a flag (flag as many as you like).
- **Open cells:** Left-click to reveal a cell. If it’s a mine, the game ends.
- **After a loss:** Incorrect flags show a ❌, correct flags stay 🚩, and all remaining mines are revealed.
- **Numbers:** Each number shows how many mines are in the 8 **adjacent** cells.
- **Fair start:** Mines are placed **after** your first left-click and never on the first cell you open.

**Difficulty Levels:**

| Level        | Board Size           | Mines |
|--------------|----------------------|-------|
| Beginner     | 9 × 9                | 10    |
| Intermediate | 16 × 16              | 40    |
| Expert       | 16 × 30              | 80    |

---

## Getting Started

**Requirements:** Node 18+ (or Docker)

### Clone & Run

1. Clone repo

```bash
git clone https://github.com/v-gajjar/Minesweeper.git
```

2. Enter folder

```bash
cd Minesweeper
```

3. Install dependencies

```bash 
npm install
```

4. Start dev server

```bash
npm run dev
```

5. Run tests:

```bash
npm test
```

6. In your browser, visit [http://localhost:5173](http://localhost:5173)


### Docker Run

1. Build image

```bash
docker build -t minesweeper:v1 .
```

2. Run container

```bash
docker run -itd -p 8083:80 --name minesweeper minesweeper:v1
```  

3. In your browser, visit [http://localhost:8083](http://localhost:8083)

---

## Test Production Build

1. Build the app

```bash
npm run build
```

2. Preview the production build locally

```bash
npm run preview
```

---

## Project Structure

Curious how things are organized? Here’s a quick look: 
<details>
<summary>Click to expand project file structure</summary>

```plaintext
.
├── .DS_Store
├── .github
│   ├── pull_request_template.md
│   └── workflows
│       └── build-checks.yaml
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
│   │   ├── Minesweeper-16-06-2025.gif
│   │   └── ui-flow.png
│   ├── components
│   │   └── feature
│   │       ├── DifficultySelect
│   │       │   ├── DifficultySelect.interfaces.ts
│   │       │   └── DifficultySelect.tsx
│   │       ├── GameBoard
│   │       │   ├── Cell
│   │       │   │   ├── Cell.interfaces.ts
│   │       │   │   └── Cell.tsx
│   │       │   ├── GameBoard.interfaces.ts
│   │       │   └── GameBoard.tsx
│   │       ├── RemainingFlagsCounter
│   │       │   ├── RemainingFlagsCounter.interface.ts
│   │       │   └── RemainingFlagsCounter.tsx
│   │       └── ResultModal
│   │           ├── ResultModal.interface.ts
│   │           └── ResultModal.tsx
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
│   ├── tests
│   │   └── unit
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

## Tech Stack

| Name                                                                  | Version | Description                                                 |
| :-------------------------------------------------------------------- | :------ | :---------------------------------------------------------- |
| [React](https://react.dev/)                                           | ^18.3.1 | UI library for building components.                         |
| [Vite](https://vitejs.dev/)                                           | ^6.0.5  | Fast dev server & bundler.                                  |
| [classnames](https://www.npmjs.com/package/classnames)                | ^2.5.1  | Utility for conditional classNames.                         |
| [Phosphor Icons](https://www.npmjs.com/package/@phosphor-icons/react) | ^2.1.7  | Flexible icon set for React.                                |

---

## Scripts

Run with `npm run <script>` (see package.json for full list).

| Category       | Script        | Description                               |
|----------------|---------------|-------------------------------------------|
| **Dev**        | dev           | Start dev server                          |
|                | build         | Type-check + production build             |
|                | preview       | Preview production build                  |
| **Test**       | test          | Run all tests once                        |
|                | test:watch    | Run tests in watch mode                   |
| **Deploy**     | predeploy     | Build before deploy                       |
|                | deploy        | Publish to GitHub Pages                   |
| **Lint/Format**| lint / lint:fix       | ESLint (JS/TS)                  |
|                | lint:css / lint:css:fix | Stylelint (CSS/SCSS)          |
|                | format / format:check | Prettier                           |
| **Checks**     | check         | Run Prettier + ESLint                     |
|                | check:fix     | Run Prettier + ESLint (auto-fix)          |

---

## Attributions

- Inter font by Rasmus Andersson (SIL Open Font License 1.1)

---

## Repository Notes

This repo was renamed from **React-Minesweeper** → **Minesweeper** (May 24, 2025).  
If you cloned the old repo, update your remote with:

```bash
git remote set-url origin https://github.com/v-gajjar/Minesweeper.git
```