#!/usr/bin/env node

// Simple workflow JSON validator: checks that files in workflows/ are valid JSON
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'workflows');
let ok = true;
if (!fs.existsSync(dir)) {
  console.error('workflows/ directory not found');
  process.exit(2);
}
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
if (!files.length) {
  console.warn('No JSON workflow files found in workflows/');
}
for (const f of files) {
  const p = path.join(dir, f);
  try {
    const s = fs.readFileSync(p, 'utf8');
    JSON.parse(s);
    console.log('OK:', f);
  } catch (err) {
    console.error('INVALID JSON in', f, '\n', err.message);
    ok = false;
  }
}
process.exit(ok ? 0 : 1);
