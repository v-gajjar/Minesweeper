# Minesweeper 🎉

![Build](https://github.com/v-gajjar/Minesweeper/actions/workflows/build-checks.yaml/badge.svg)
![License](https://img.shields.io/github/license/v-gajjar/Minesweeper)
![Contributors](https://img.shields.io/github/contributors/v-gajjar/Minesweeper)
![Last Commit](https://img.shields.io/github/last-commit/v-gajjar/Minesweeper)
![Stars](https://img.shields.io/github/stars/v-gajjar/Minesweeper?style=social)

![preview](https://github.com/v-gajjar/Minesweeper/blob/main/src/assets/Minesweeper-16-06-2025.gif)

**Play now:** [Live Demo](https://v-gajjar.github.io/Minesweeper/)  

---

## About ⚡

Classic **Minesweeper** — reloaded for the modern web.  
Built with **React + TypeScript**, styled for today’s UX, and kept alive by a growing community of contributors.

- ✨ Clean interface  
- 🎨 Thoughtful UX  
- ⚡ Powered by Vite 

---

## Roadmap 🗺️

We’re actively evolving this game! Some upcoming ideas:  

- ✅ Smooth gameplay & difficulty levels  
- 🚧 Dark mode & UX polish  
- 🚀 Smarter stats (spot patterns & key cells)  
- 🎵 Sounds, timers, and more UX features  
- 🌍 Accessibility, themes, and language support  
- 🪄 Upcoming **Home Screen** with quick buttons for:  
  - 📖 Game rules  
  - ⚙️ Settings  
  - ▶️ Play now

👉 See the [Roadmap Board](https://github.com/users/v-gajjar/projects/2) or [open issues](https://github.com/v-gajjar/Minesweeper/issues) for the full list.  

---

## How to Play 🎮

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

## Getting Started ⚡

**Requirements:** Node 18+ (or Docker)

### Clone & Run

📥 Clone repo

```bash
git clone https://github.com/v-gajjar/Minesweeper.git
```

📂 Enter folder

```bash
cd Minesweeper
```

📦 Install dependencies

```bash 
npm install
```

🚀 Start dev server

```bash
npm run dev
```

🧪 Run tests:

```bash
npm test
```

👉 In your browser, visit [http://localhost:5173](http://localhost:5173)

### Docker Run 🐳

🔨 Build image

```bash
docker build -t minesweeper:v1 .
```

▶️ Run container

```bash
docker run -itd -p 8083:80 --name minesweeper minesweeper:v1
```  

👉 In your browser, visit [http://localhost:8083](http://localhost:8083)

---

## 📂 Project Structure

Curious how things are organized? Here’s a quick look: 
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

## Tech Stack 📦

| Name                                                                  | Version | Description                                                 |
| :-------------------------------------------------------------------- | :------ | :---------------------------------------------------------- |
| [React](https://react.dev/)                                           | ^18.3.1 | UI library for building components.                         |
| [Vite](https://vitejs.dev/)                                           | ^6.0.5  | Fast dev server & bundler.                                  |
| [classnames](https://www.npmjs.com/package/classnames)                | ^2.5.1  | Utility for conditional classNames.                         |
| [Phosphor Icons](https://www.npmjs.com/package/@phosphor-icons/react) | ^2.1.7  | Flexible icon set for React.                                |

---

## Scripts 🧰 (at a glance)

Run with `npm run <script>` (see package.json for full list).

📦 Dev
- dev — start dev server
- build — type-check + production build
- preview — preview production build

🧪 Test
- test — run all tests once
- test:watch — watch mode

🌐 Deploy
- predeploy — build before deploy
- deploy — publish to GitHub Pages

🧹 Lint & Format
- lint / lint:fix — ESLint (JS/TS)
- lint:css / lint:css:fix — Stylelint (CSS/SCSS)
- format / format:check — Prettier

✅ Checks
- check — run Prettier + ESLint
- check:fix — run Prettier + ESLint (auto-fix)

---

## Contributing 🤝

We ❤️ contributions of all kinds! Whether it’s fixing a bug, suggesting a feature, or polishing docs, your help makes this game better.  

How to join in:  
- 🍴 Fork & open a PR 
- 📝 Add yourself to [Contributors](./CONTRIBUTORS.md)
- 💡 Share ideas in [roadmap discussions](https://github.com/users/v-gajjar/projects/2)  
- 🐛 Report bugs via [Issues](https://github.com/v-gajjar/Minesweeper/issues)

Every contribution, big or small, helps keep this project alive 🎉

---

## Attributions 📚

- Inter font by Rasmus Andersson (SIL Open Font License 1.1)

---

## Acknowledgements ❤️

Minesweeper is a community project, shaped by everyone who’s played, tested, and contributed.  
Every commit, idea, and bug report makes the game better.  

[![Contributors](https://contrib.rocks/image?repo=v-gajjar/Minesweeper)](./CONTRIBUTORS.md)  

👉 Meet all our amazing [Contributors](./CONTRIBUTORS.md)

---

## Repository Notes 📌

This repo was renamed from **React-Minesweeper** → **Minesweeper** (May 24, 2025).  
If you cloned the old repo, update your remote with:

```bash
git remote set-url origin https://github.com/v-gajjar/Minesweeper.git
```