#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const catalogPath = path.resolve(__dirname, '../../../COMPONENT_CATALOG.md');

function readCatalog() {
  try {
    return fs.readFileSync(catalogPath, 'utf8');
  } catch (e) {
    return '';
  }
}

function listComponents() {
  const content = readCatalog();
  const lines = content.split(/\r?\n/);
  const components = lines.filter(l => /^##\s+/g.test(l)).map(l => l.replace(/^##\s+/, '').trim());
  console.log(JSON.stringify({components}, null, 2));
}

function generateMockup(title, desc) {
  const lines = [];
  lines.push('+' + '-'.repeat(46) + '+');
  lines.push('| ' + title.padEnd(44) + ' |');
  lines.push('+' + '-'.repeat(46) + '+');
  lines.push('| ' + desc.padEnd(44) + ' |');
  lines.push('+' + '-'.repeat(46) + '+');
  lines.push('| ' + 'Header'.padEnd(44) + ' |');
  lines.push('| ' + '  - Use PrototypeWrapper'.padEnd(44) + ' |');
  lines.push('| ' + '  - Official DocuSign logo'.padEnd(44) + ' |');
  lines.push('| ' + 'Main content'.padEnd(44) + ' |');
  lines.push('| ' + '  - Primary CTA'.padEnd(44) + ' |');
  lines.push('+' + '-'.repeat(46) + '+');

  const catalog = readCatalog();
  const suggested = [];
  if (/header/i.test(desc)) suggested.push('Header');
  if (/button|cta/i.test(desc)) suggested.push('Button');
  if (/form|input/i.test(desc)) suggested.push('Form, TextInput');

  console.log(JSON.stringify({mockup: lines.join('\n'), suggested}, null, 2));
}

function usage() {
  console.log('Usage: handler.js <command> [options]');
  console.log('Commands: list-components | generate-mockup --title "T" --desc "D"');
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0) return usage();
  const cmd = argv[0];
  if (cmd === 'list-components') return listComponents();
  if (cmd === 'generate-mockup') {
    const titleIndex = argv.indexOf('--title');
    const descIndex = argv.indexOf('--desc');
    const title = titleIndex >= 0 ? argv[titleIndex + 1] : 'Prototype';
    const desc = descIndex >= 0 ? argv[descIndex + 1] : 'No description provided';
    return generateMockup(title, desc);
  }
  usage();
}

if (require.main === module) main();
