// Shared Karma configuration.

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'traceur', 'requirejs'],

    traceurPreprocessor: {
      options: {
        modules: 'amd',
        types: true,
        typeAssertions: true,
        typeAssertionModule: 'rtts-assert',
        annotations: true,
        sourceMap: true
        /**
         * Someday blockBinding would be nice, but for now it compiles to nasty
         * ES5 code (everything in a closure)
         */
        // blockBinding: true
      }
    },


    sauceLabs: {
      testName: 'AngularJS v2 - default',
      startConnect: true,
      options: {
        'avoid-proxy': true,
        'selenium-version': '2.37.0'
      }
    },


    customLaunchers: {
      'Chrome_harmony': {
        base: 'Chrome',
        flags: ['--js-flags=--harmony']
      },

      // Sauce Labs browsers
      'SL_Chrome': {
        base: 'SauceLabs',
        browserName: 'chrome'
      },
      'SL_Firefox': {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '26'
      },
      'SL_Safari': {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.9',
        version: '7'
      },
      'SL_IE_9': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 2008',
        version: '9'
      },
      'SL_IE_10': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 2012',
        version: '10'
      },
      'SL_IE_11': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
      }
    },


    browsers: ['Chrome']
  });

  if (process.env.TRAVIS) {
    config.logLevel = config.LOG_DEBUG;
    config.sauceLabs.build = 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')';
    config.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;

    process.env.SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY.split('').reverse().join('');

    // TODO(vojta): remove once SauceLabs supports websockets.
    // This speeds up the capturing a bit, as browsers don't even try to use websocket.
    config.transports = ['xhr-polling'];
  }
};
