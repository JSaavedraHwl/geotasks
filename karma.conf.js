module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    files: [
      // Agrega el archivo mock antes de las pruebas
      { pattern: './google-maps-mock.js', included: true, watched: false },
    ],
    client: {
      jasmine: {
        // Configuraciones adicionales para Jasmine
      },
      clearContext: false // Deja visible el visor de Jasmine Spec Runner
    },
    jasmineHtmlReporter: {
      suppressAll: true // Remueve trazas duplicadas
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/app'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
