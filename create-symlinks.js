var fs = require('fs');
var path = require('path');

var NODE_MODULES_DIR = path.resolve(__dirname, '..');
var PARENT_DIR = path.resolve(__dirname, '../..');

if (path.basename(NODE_MODULES_DIR) !== 'node_modules') {
  console.log('Pipe is not inside node_modules, not installing symlinks.')
  process.exit(0);
}


['karma', 'gulp'].forEach(function(name) {
  var symlinkPath = NODE_MODULES_DIR + '/' + name;

  if (fs.existsSync(symlinkPath)) {
    console.log(symlinkPath + ' already exists, removing...');
    fs.unlinkSync(symlinkPath);
  }

  fs.symlinkSync('pipe/node_modules/' + name, symlinkPath);
});
