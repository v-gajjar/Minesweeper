// scripts/check-pm.js

const execPath = process.env.npm_execpath || "";

// Detect npm or yarn
const isNpm = execPath.includes("npm");
const isYarn = execPath.includes("yarn");

if (isNpm || isYarn) {
  console.error(`
⚠️  STOP! This project uses pnpm, not ${isNpm ? "npm" : "yarn"}.

Install pnpm:
  https://pnpm.io/installation

Then run:
  pnpm install
`);

  process.exit(1); // ❌ Abort install
}