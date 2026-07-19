import { createRequire } from 'module';
// Bridge for deployment platforms that expect a `server.js` entry file.
// This file is ESM (package.json type="module") and uses createRequire
// to load the built CommonJS bundle at ./dist/server.cjs.

const require = createRequire(import.meta.url);

// If the dist file isn't present, print a helpful error and exit with code 1
try {
  require('./dist/server.cjs');
} catch (err) {
  console.error('Failed to load ./dist/server.cjs. Have you run the build?\n', err);
  process.exit(1);
}
