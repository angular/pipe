// Shared Gulp configuration.

var _ = require('lodash');

exports.traceur = function(options) {
  return _.defaults(options || {}, {
    modules: 'amd',
    types: true,
    annotations: true,
    typeAssertions: true,
    typeAssertions: true,
    typeAssertionModule: 'rtts-assert'
  });
};
