#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const workflowDir = path.join(__dirname, '..', 'workflows');

if (!fs.existsSync(workflowDir)) {
  console.error('workflows/ directory not found');
  process.exit(2);
}

const files = fs
  .readdirSync(workflowDir)
  .filter((file) => file.toLowerCase().endsWith('.json'))
  .sort();

if (!files.length) {
  console.warn('No JSON workflow files found in workflows/');
  process.exit(0);
}

let ok = true;

for (const file of files) {
  const filePath = path.join(workflowDir, file);

  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
    const parsed = JSON.parse(raw);

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('root JSON value must be an object');
    }

    if (!Array.isArray(parsed.nodes)) {
      throw new Error('missing "nodes" array');
    }

    console.log(`OK: ${file} (${parsed.nodes.length} nodes)`);
  } catch (err) {
    console.error(`INVALID WORKFLOW: ${file}`);
    console.error(err.message);
    ok = false;
  }
}

process.exit(ok ? 0 : 1);
