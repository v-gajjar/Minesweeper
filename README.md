# Minesweeper

<p align="center">
  <img src="https://img.shields.io/github/contributors/v-gajjar/Minesweeper" alt="Contributors count" />
  <img src="https://img.shields.io/github/last-commit/v-gajjar/Minesweeper" alt="Date of last commit" />
  <img src="https://img.shields.io/github/stars/v-gajjar/Minesweeper?style=social" alt="GitHub stars" />
  <a href="https://github.com/v-gajjar/Minesweeper/actions/workflows/build-checks.yaml">
    <img src="https://github.com/v-gajjar/Minesweeper/actions/workflows/build-checks.yaml/badge.svg" alt="Build status from GitHub Actions" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Built%20with-React-61dafb?logo=react&logoColor=white" alt="Built with React" />
  <img src="https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white" alt="TypeScript logo" />
  <img src="https://img.shields.io/github/license/v-gajjar/Minesweeper" alt="License: MIT" />
</p>

<p align="center">
  <img src="https://github.com/v-gajjar/Minesweeper/blob/main/src/assets/Minesweeper-16-06-2025.gif"
       alt="Gameplay preview of the Minesweeper React app"
       width="600"
       style="max-width:100%;" />
</p>

<p align="center">
  <strong>Play now:</strong><br />
  <a href="https://v-gajjar.github.io/Minesweeper/" target="_blank">Live Demo</a>
</p>

---href="https://v-gajjar.github.io/Minesweeper/" target="_blank">Live Demo</a>
</p>

---

## About

A modern, open-source remix of the classic Minesweeper, powered by today’s tech and tomorrow’s UX standards.

We’re not just cloning nostalgia, we’re reinventing it. Expect clean design, fluid gameplay, and a welcoming home screen that helps new players learn quickly, and lets veterans dive straight into “Play Now.”

---

## Architecture Overview

![UI Flow Diagram](./src/assets/ui-flow.png)

This diagram shows how the app’s components and game logic interact — from user input to board rendering and win/loss conditions.

For deeper technical details, see the [Architecture section in the Wiki](https://github.com/v-gajjar/Minesweeper/wiki#architecture).

---

## How to Play

Learn how to master Minesweeper from basic rules to advanced strategies in the official wiki guide:

[View How to Play in the Wiki](https://github.com/v-gajjar/Minesweeper/wiki#how-to-play)

---

## Roadmap

The Minesweeper project is continuously evolving with community-driven improvements and new features.  
You can explore the full development roadmap — including upcoming enhancements and active milestones — directly in the wiki:

[View the Roadmap in the Wiki](https://github.com/v-gajjar/Minesweeper/wiki#roadmap)

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

### Production Build

Run a production-optimized build locally to verify everything works before deployment.

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

For a full overview of the folder layout, component organization, and key files, see:

[[Project Structure]](https://github.com/v-gajjar/Minesweeper/wiki/Project-Structure)

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

All development, testing, and deployment commands are documented in the wiki.  
Use this reference to learn how each script works and when to use it.

[View Scripts in the Wiki](https://github.com/v-gajjar/Minesweeper/wiki#scripts)

---

## Contributing

We love contributions of all kinds! Whether it’s fixing a bug, suggesting a feature, or polishing docs, your help makes this game better.  

How to join in:

- Fork & open a PR 
- Add yourself to [Contributors](./CONTRIBUTORS.md)
- Share ideas in [roadmap discussions](https://github.com/users/v-gajjar/projects/2)  
- Report bugs via [Issues](https://github.com/v-gajjar/Minesweeper/issues)

Every contribution, big or small, helps keep this project alive.

---

## Acknowledgements

Minesweeper is a community project, shaped by everyone who’s played, tested, and contributed.  
Every commit, idea, and bug report makes the game better.  

[![Contributors](https://contrib.rocks/image?repo=v-gajjar/Minesweeper)](./CONTRIBUTORS.md)  

Meet all our amazing [Contributors](./CONTRIBUTORS.md)

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

---

## License

Licensed under the [MIT License](./LICENSE).