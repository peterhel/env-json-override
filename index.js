'use strict';

var debug = require('debug')('env-json-override');
var path = require('path');

if(! require.main) {
  throw new Error('This module must be required from a module.');
}

const dirname = path.dirname(require.main.filename);
let _config = null;

function print(parentKey, o) {
  for(var key in o) {
    var currentKey = (parentKey ? parentKey + '_' : '') + key;
    var current = o[key];
    if (typeof(current) === 'object'){
      print(currentKey, current);
    } else {
      let envVar = currentKey.toUpperCase()
      debug(`Checking for environment variable ${envVar}`);
      if(typeof(process.env[envVar]) === 'string') {
        debug(`Overriding value for ${envVar}`);
        o[key] = process.env[envVar];
      }
    }
  }
}

function overrideJSON(filename) {
  const fullpath = filename;

  debug('fullpath', fullpath);

  const config = require(fullpath);

  print(null, config);

  return config;
}

module.exports = (filename, root) => {
  return overrideJSON(path.resolve(root, filename));
}