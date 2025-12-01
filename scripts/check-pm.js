// scripts/check-pm.js

const execPath = process.env.npm_execpath || '';
const userAgent = process.env.npm_config_user_agent || '';

// Explicitly detect pnpm first
const isPnpm = execPath.includes('pnpm') || userAgent.startsWith('pnpm/');

// Detect npm / yarn only if it's not pnpm
const isNpm =
  !isPnpm && (execPath.includes('npm') || userAgent.startsWith('npm/'));
const isYarn = execPath.includes('yarn') || userAgent.startsWith('yarn/');

if (isNpm || isYarn) {
  console.error(`
⚠️  STOP! This project uses pnpm, not ${isNpm ? 'npm' : 'yarn'}.

Install pnpm:
  https://pnpm.io/installation

Then run:
  pnpm install
`);

  process.exit(1);
}
