**Note:** This repository was renamed from `React-Minesweeper` to `Minesweeper` on May 24, 2025.  
Please update your remote repository URL if you have cloned the old repo.

# Description
A community-driven, open-source reimagining of the classic Minesweeper experience. Built with thoughtful UX, using modern front-end technologies including React and TypeScript. The project is in active development and was last updated on 30th August 2025. 

 ![preview](https://github.com/v-gajjar/Minesweeper/blob/main/src/assets/Minesweeper-16-06-2025.gif)

---

## 🚀 What’s New

<!-- START:WHATS_NEW -->
- 🔹 Fixing when it fires ([2d78146](https://github.com/v-gajjar/Minesweeper/commit/2d78146))
- 🔹 Fixing this up a bit ([8b2dd94](https://github.com/v-gajjar/Minesweeper/commit/8b2dd94))
- 🔹 Making this a blue check mark instead for default ([b3e023a](https://github.com/v-gajjar/Minesweeper/commit/b3e023a))
- 🔹 forgot the README.md change this adds that in ([d492fbb](https://github.com/v-gajjar/Minesweeper/commit/d492fbb))
- 🔹 Adding whathaschange github action to branch ([6d7a2b8](https://github.com/v-gajjar/Minesweeper/commit/6d7a2b8))
- 🔹 Create PR template for Minesweeper repo ([39ef519](https://github.com/v-gajjar/Minesweeper/commit/39ef519))
- 🔹 correct indentation ([d9dea2b](https://github.com/v-gajjar/Minesweeper/commit/d9dea2b))
- 🔹 correct a spelling typo ([9b987c0](https://github.com/v-gajjar/Minesweeper/commit/9b987c0))
- 🔹 updates to documentation ([a9ae7fc](https://github.com/v-gajjar/Minesweeper/commit/a9ae7fc))
- 🔹 Add script for prettier & eslint, ran both with --fix ([aa5c9a2](https://github.com/v-gajjar/Minesweeper/commit/aa5c9a2))
- 🔹 Fix eslint flat config, create prettier config and ignore ([8922075](https://github.com/v-gajjar/Minesweeper/commit/8922075))
- 🔹 re-oganised some of the sections, and updated the description ([3f7c9eb](https://github.com/v-gajjar/Minesweeper/commit/3f7c9eb))
- 🔹 re-organised the Getting Started section and minor fixes ([621b947](https://github.com/v-gajjar/Minesweeper/commit/621b947))
- 🔹 grammer fix ([f5d8068](https://github.com/v-gajjar/Minesweeper/commit/f5d8068))
- 🧹 updated names of ts types ([5a9f2ea](https://github.com/v-gajjar/Minesweeper/commit/5a9f2ea))
- 🔹 a few minor tweaks/corrections ([229ab55](https://github.com/v-gajjar/Minesweeper/commit/229ab55))
- 🔹 Update the documentation based on recent progrres, changes in priority and contributions ([809df05](https://github.com/v-gajjar/Minesweeper/commit/809df05))
- 🐛 removed .jsx from renamed files' imports ([eb373e5](https://github.com/v-gajjar/Minesweeper/commit/eb373e5))
- 🧹 migrated to TS all components, config and enum files ([b34839c](https://github.com/v-gajjar/Minesweeper/commit/b34839c))
- 🧹 added base changes to support ts ([bf1e199](https://github.com/v-gajjar/Minesweeper/commit/bf1e199))
<!-- END:WHATS_NEW -->

---

# Live Demo
Try it out in a browser: [https://v-gajjar.github.io/Minesweeper/](https://v-gajjar.github.io/Minesweeper/)


# Development Roadmap

### Tasks in progress (updated 30th August 2025)
- TypeScript Conversion (partially implemented)
- Fixing an issue with longpress on mobile

### Next steps
See full [roadmap](https://github.com/v-gajjar/Minesweeper/blob/main/ROADMAP.md)


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




   
   
