#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const debugFunc = require('debug');

const debug = debugFunc('app:server:prod');

try {
  fs.statSync(path.join(__dirname, '../dist'));
} catch (e) {
  debug(e);
  debug('pls run `npm run build` first!');
  process.exit(0);
}
require('../dist');
