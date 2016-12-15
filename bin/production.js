#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

try {
  fs.statSync(path.join(__dirname, '../dist'));
} catch (e) {
  console.log(e);
  console.error('pls run `npm run build` first!');
  process.exit(0);
}
require('../dist');
