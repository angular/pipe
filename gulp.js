// Shared Gulp configuration.

var traceur = require('gulp-traceur');

exports.traceur = function() {
  return traceur({modules: 'amd', types: true, annotations: true});
};
