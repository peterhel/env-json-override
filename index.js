'use strict';

if(! require.main) {
  throw new Error('This module must be required from a module.');
}

const path = require('path');

const dirname = path.dirname(require.main.filename);

function print(parentKey, o) {
  for(var key in o) {
    var currentKey = (parentKey ? parentKey + '_' : '') + key;
    var current = o[key];
    if (typeof(current) === 'object'){
      print(currentKey, current);
    } else {
      let envVar = currentKey.toUpperCase()
      console.log(`Checking for environment variable ${envVar}`);
      if(process.env[envVar]) {
        console.log(` -> Overriding value`);
        o[key] = process.env[envVar];
      }
    }
  }
}

module.exports = function overrideJSON(filename) {
  const caller = module.parent.filename;

  console.log(caller);

  const dirname = path.dirname(caller);
  const fullpath = path.resolve(dirname, filename);
  const config = require(fullpath);

  print(null, config);

  return config;
};