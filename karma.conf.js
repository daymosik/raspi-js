module.exports = function(config) {
  'use strict';
  config.set({

    basePath: '',

    frameworks: ['mocha', 'chai'],

    files: [
      'test/app/*.spec.js'
    ],

    preprocessors: {
      'test/app/*.spec.js': ['babel'],
      'src/**/*.js': ['babel']
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    reporters: ['progress'],

    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    browsers: ['PhantomJS']

  });
};
