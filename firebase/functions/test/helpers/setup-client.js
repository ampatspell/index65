module.exports = function(ctx) {

  const firebase = require('firebase');

  require('firebase/firestore');
  require('firebase/functions');
  require('firebase/storage');

  let app = firebase.initializeApp(require('../../../config.json'), 'client');

  let firestore = app.firestore();
  firestore.settings({ timestampsInSnapshots: true });

  let storage = app.storage();
  let auth = app.auth();

  let signIn = require('./client/sign-in')(ctx);
  let signOut = require('./client/sign-out')(ctx);
  let denied = require('./client/denied')(ctx);

  ctx.client = {
    app,
    firestore,
    storage,
    auth,
    signIn,
    signOut,
    denied
  };

  return () => app.delete();
}