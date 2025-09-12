**Note:** This repository was renamed from `React-Minesweeper` to `Minesweeper` on May 24, 2025.  
Please update your remote repository URL if you have cloned the old repo.

# Description
A community-driven, open-source reimagining of the classic Minesweeper experience. Built with thoughtful UX, using modern front-end technologies including React and TypeScript. The project is in active development and was last updated on 30th August 2025. 

 ![preview](https://github.com/v-gajjar/Minesweeper/blob/main/src/assets/Minesweeper-16-06-2025.gif)

## 🚀 What’s New
<!-- START:WHATS_NEW -->
- • Change cells from divs to buttons ([910422a](https://github.com/v-gajjar/Minesweeper/commit/910422ae92f35d19884f07178f658e6340cd8a5e))
- • Add labels to the cell buttons ([1d3b3bf](https://github.com/v-gajjar/Minesweeper/commit/1d3b3bfba218f2e58afa8b2655364f7ba5a23ab2))
- • Fix labels and add function to assign labels for cells ([92070da](https://github.com/v-gajjar/Minesweeper/commit/92070dae8519c4b6733ce3c49d8bb04f7fb19dc1))
- • Adjust accessibility for difficulty selector ([be9cf34](https://github.com/v-gajjar/Minesweeper/commit/be9cf34228b30ec471c319637900be7048bc4ff0))
- • Adjust accessibility of the game result modal ([9f1bf1a](https://github.com/v-gajjar/Minesweeper/commit/9f1bf1ae3bd94b01383a0a60bcc20d548cabbbbf))
- • Adding commit-updates.yaml file for github actions ([3fc4113](https://github.com/v-gajjar/Minesweeper/commit/3fc41135a3c12b3f49580404b82a5c9d2f82e38d))
- • Making some tweaks to this change to only look at current changes to add to readme.md ([d759bbb](https://github.com/v-gajjar/Minesweeper/commit/d759bbbf23f0d178ffda5b7a53c6c83f7ee71b34))
- • One more tweak needed ([b95f2c0](https://github.com/v-gajjar/Minesweeper/commit/b95f2c00bb4054ebc2f8176c20c8d06602a50c34))
<!-- END:WHATS_NEW -->

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




   
   
