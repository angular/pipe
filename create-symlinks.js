// This script is run after npm install.
// It creates symlinks from the repo's node_modules into pipe's node_modules.
// This is required so that we can run gulp/karma from within the repo,
// but use gulp/karma from pipe.

var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

var NODE_MODULES_DIR = path.resolve(__dirname, '..');

if (path.basename(NODE_MODULES_DIR) !== 'node_modules') {
  console.log('Pipe is not inside node_modules, not installing symlinks.')
  process.exit(0);
}


function installSymlink(symlinkPath, symlinkTarget) {
  console.log('Installing symlink ' + symlinkPath + ' -> ' + symlinkTarget);
  fs.symlinkSync(symlinkTarget, symlinkPath);
}

function removeAndInstall(symlinkPath, symlinkTarget) {
  console.log(symlinkPath + ' already exists, removing...');
  rimraf(symlinkPath, function(err) {
    if (err) {
      console.log('Cannot remove ' + symlinkPath);
      console.log('  Please install the symlink manually:');
      console.log('  ' + symlinkPath + ' -> ' + symlinkTarget);
      return;
    }

    installSymlink(symlinkPath, symlinkTarget);
  });
}

['karma', 'gulp'].forEach(function(name) {
  var symlinkPath = NODE_MODULES_DIR + '/' + name;
  var symlinkTarget = 'pipe/node_modules/' + name;

  if (fs.existsSync(symlinkPath)) {
    removeAndInstall(symlinkPath, symlinkTarget);
  } else {
    fs.lstat(symlinkPath, function(err, stat) {
      if (stat) {
        removeAndInstall(symlinkPath, symlinkTarget);
      } else {
        installSymlink(symlinkPath, symlinkTarget);
      }
    });
  }
});
