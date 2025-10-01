# Minesweeper 🎉

![Build](https://github.com/v-gajjar/Minesweeper/actions/workflows/build-checks.yaml/badge.svg)
![License](https://img.shields.io/github/license/v-gajjar/Minesweeper)
![Contributors](https://img.shields.io/github/contributors/v-gajjar/Minesweeper)
![Last Commit](https://img.shields.io/github/last-commit/v-gajjar/Minesweeper)
![Stars](https://img.shields.io/github/stars/v-gajjar/Minesweeper?style=social)

![preview](https://github.com/v-gajjar/Minesweeper/blob/main/src/assets/Minesweeper-16-06-2025.gif)

**Play now:** [Live Demo](https://v-gajjar.github.io/Minesweeper/)  

---

## About
A community-driven, open-source reimagining of the classic **Minesweeper**.  
Built with **React + TypeScript**, designed with modern UX, and kept fresh by awesome contributors.  

- ✨ Clean interface  
- 🎨 Thoughtful UX  
- ⚡ Powered by Vite  

---

## Roadmap 🗺️
We’re actively evolving this game! A few highlights:  

- ✅ Smooth gameplay & difficulty levels  
- 🚧 Dark mode & UX polish  
- 🚀 Advanced analytics (cluster detection, centrality)  
- 🧩 Community feature requests  

👉 See the [Kanban Board](https://github.com/users/v-gajjar/projects/2) for full progress.  

---

## How to Play 🎮
- **Left-click** → reveal cell  
- **Right-click** → flag cell  
- Numbers = nearby mines  
- Don’t explode 💥  

**Difficulty Levels:**

| Level        | Board Size           | Mines |
|--------------|----------------------|-------|
| Beginner     | 9 × 9                | 10    |
| Intermediate | 16 × 16              | 40    |
| Expert       | 16 × 30              | 80    |

---

## Getting Started ⚡

### Clone & Run
```bash
git clone https://github.com/v-gajjar/Minesweeper.git
cd Minesweeper
npm install
npm run dev
```
👉 In your browser, visit [http://localhost:5173](http://localhost:5173)

### Docker Run

```bash
docker build -t minesweeper:v1 .
docker run -itd -p 8083:80 --name minesweeper minesweeper:v1
```  

👉 In your browser, visit [http://localhost:8083](http://localhost:8083)

---

## 📂 Project Structure

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
| [React](https://reactjs.org/)                                         | ^18.3.1 | JavaScript library for building component-based UIs.        |
| [Vite](https://vitejs.dev/)                                           | ^6.0.5  | Fast build tool and development server for modern web apps. |
| [classnames](https://www.npmjs.com/package/classnames)                | ^2.5.1  | Utility for conditionally joining class names together.     |
| [Phosphor Icons](https://www.npmjs.com/package/@phosphor-icons/react) | ^2.1.7  | Clean, modern SVG-based icon set.                           |

---

## Contributing 🤝

We’d love your ideas, bug fixes, and enhancements!
- Fork & open **PRs**
- Add yourself to **[Contributors](./CONTRIBUTORS.md)**
- Join the **roadmap discussions**

---

## Attributions 📚
- Inter font by Rasmus Andersson (SIL Open Font License 1.1)

---

## Acknowledgements ❤️

Thanks to all contributors for shaping this project!

- [Contributors](./CONTRIBUTORS.md) 

---

## Repository Notes

📌 This repo was renamed from React-Minesweeper → Minesweeper (May 24, 2025).
Update your remote if you cloned the old repo.