'use strict';

let config = require('../config');

const firebaseConfiguration = environment => {
  let assert = require('assert');
  let firebaseEnvironment = process.env.FIREBASE;
  if(!firebaseEnvironment) {
    if(environment === 'production') {
      console.log('No FIREBASE environment variable set.'); // eslint-disable-line no-console
      process.exit(-1);
    }
    firebaseEnvironment = 'development';
  }
  let firebase = config[firebaseEnvironment];
  assert(!!firebase, `no firebase configuration for environment '${firebaseEnvironment}'`);
  if(!process.env._FIREBASE_LOGGED) {
    console.log('Firebase:', firebaseEnvironment, '→', firebase.projectId); // eslint-disable-line no-console
    process.env._FIREBASE_LOGGED = true;
  }
  return firebase;
}

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'index65',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
      },
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },
    APP: {
    },
    index65: {
      firebase: firebaseConfiguration(environment)
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
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    //
  }

  return ENV;
};
