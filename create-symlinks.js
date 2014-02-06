var fs = require('fs');
var path = require('path');

var NODE_MODULES_DIR = path.resolve(__dirname, '..');
var PARENT_DIR = path.resolve(__dirname, '../..');


// TODO(vojta): handle if the symlink already exists
['karma', 'gulp'].forEach(function(name) {
  fs.symlinkSync('pipe/node_modules/' + name, NODE_MODULES_DIR + '/' + name);
});
