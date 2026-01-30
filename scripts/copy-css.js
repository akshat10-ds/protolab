import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Copy design tokens
const tokensPath = path.join(__dirname, '../src/design-system/1-tokens/tokens.css');
if (fs.existsSync(tokensPath)) {
  fs.copySync(
    tokensPath,
    path.join(__dirname, '../dist/tokens.css')
  );
  console.log('✅ Copied tokens.css to dist/');
} else {
  console.warn('⚠️ tokens.css not found at', tokensPath);
}

// Copy all CSS files from design-system
const srcDir = path.join(__dirname, '../src/design-system');
const distDir = path.join(__dirname, '../dist/design-system');

fs.ensureDirSync(distDir);
fs.copySync(srcDir, distDir, {
  filter: (src) => {
    // Copy CSS files only, not node_modules
    if (src.includes('node_modules')) return false;
    if (src.endsWith('.css') || src.endsWith('.module.css')) return true;
    if (fs.statSync(src).isDirectory()) return true;
    return false;
  }
});

console.log('✅ CSS files copied to dist/design-system');
