module.exports = function(ctx) {

  const firebase = require('firebase');

  require('firebase/storage');
  require('firebase/firestore');
  require('firebase/functions');

  let app = firebase.initializeApp(require('../../config.json'), 'client');

  let firestore = app.firestore();
  firestore.settings({ timestampsInSnapshots: true });

  let storage = app.storage();
  let auth = app.auth();

  ctx.client = {
    app,
    firestore,
    storage,
    auth
  };

  return () => app.delete();
}