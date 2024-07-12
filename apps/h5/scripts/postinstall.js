const child_process = require('child_process');
if (!process.platform.includes('linux')) {
  child_process.execSync('pnpm build:locale');
}
