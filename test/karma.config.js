// Karma configuration
// Generated on Mon Dec 14 2015 14:03:13 GMT+0800 (CST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'], //,'commonjs'


    // list of files / patterns to load in the browser
    files: [
        'app/components/jquery/dist/jquery.js',
        'app/components/jquery-ui/jquery-ui.js',
        'app/components/moment/moment.js',
        'app/components/thenjs/then.js',
        'app/components/lodash/lodash.js',
        'app/components/angular/angular.js',
        'app/components/restangular/dist/restangular.js',
        'app/components/angular-animate/angular-animate.js',
        'app/components/angular-sanitize/angular-sanitize.js',
        'app/components/angular-strap/dist/angular-strap.js',
        'app/components/angular-strap/dist/angular-strap.tpl.js',
        'app/components/angular-bootstrap/ui-bootstrap.js',
        'app/components/angular-bootstrap/ui-bootstrap-tpls.js',
        'app/components/angular-ui-router/release/angular-ui-router.js',
        'app/components/angular-ui-sortable/sortable.js',
        'app/components/angular-loading-bar/src/loading-bar.js',
        'app/scripts/easemobSDK/strophe.js',
        'app/scripts/easemobSDK/json2.js',
        'app/scripts/easemobSDK/easemob.im-1.0.7.js',
        'app/scripts/*.js',
        // 'test/src/dashboard/index.js',
        // 'test/src/dashboard/**/*.js',
        // 'app/modules/**/*.js',
        // 'app/scripts/easemobSDK/*.js',
        // 'app/scripts/app.js',
        '.tmp/scripts/bundle.js',
        'app/components/angular-mocks/angular-mocks.js',
        'test/spec/**/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
        'app/scripts/app.js',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        // 'test/src/**/*.js':['commonjs']
        '.tmp/scripts/bundle.js': ['coverage']
        // 'app/components/angular-mocks/angular-mocks.js':['commonjs']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','jasmine-runner','coverage'], //,'jasmine-runner'


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity,

    jasmineRunnerReporter: {
      outputFile: 'report/jasmine-runner.html',
      includes: [
        "node_modules/jasmine-expect/dist/jasmine-matchers.js"
      ]
    },
    coverageReporter: {
      type : 'html',
      dir : 'report/'
    }
  })
}
