/* eslint-env node */
'use strict';

module.exports = function(environment) {
  const useDb = false;

  let ENV = {
    useDb,
    modulePrefix: 'ember-invoice-manager',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    googleFonts: [
      'Open+Sans:300,400,700',
      'Montserrat:300,700'
    ],

    // highlight.js settings
    emberHighlightJs: {
      style: 'monokai-sublime'
    },

    // Set or update content security policies
    contentSecurityPolicy: {
      'font-src': "'self' fonts.gstatic.com",
      'style-src': "'self' fonts.googleapis.com"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.useDb = false;
  }

  if (environment === 'production') {
    ENV.useDb = false;
  }

  ENV['ember-cli-mirage'] = {
    directory: 'app/mirage',
    enabled: !ENV.useDb
  };

  return ENV;
};
