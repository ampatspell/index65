module.exports = function() {

  const firebase = require('firebase');
  require('firebase/firestore');

  return firebase.initializeApp(require('../../config.json'), 'client');
};