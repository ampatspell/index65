module.exports = function(sender) {

  const firebase = require('firebase');
  require('firebase/firestore');

  const setup = () => {
    let app = firebase.initializeApp(require('../config.json'));
    sender.app = app;
    sender.firestore = app.firestore();
    sender.firestore.settings({ timestampsInSnapshots: true });
    sender.auth = app.auth();
    return () => app.delete();
  }

  beforeEach(() => {
    sender.cleanup = setup(sender);
  });

  afterEach(() => {
    sender.cleanup();
  });

}