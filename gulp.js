// Shared Gulp configuration.

var traceur = require('gulp-traceur');
var _ = require('lodash');

exports.traceur = function(options) {
  return traceur(_.defaults(options || {}, {modules: 'amd', types: true, annotations: true}));
};
