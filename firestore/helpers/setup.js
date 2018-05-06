module.exports = function(sender) {

  const initializeApp = require('./firebase');
  const initializeAdmin = require('./admin');

  const setup = () => {
    let app = initializeApp();
    let admin = initializeAdmin();

    sender.app = app;
    sender.admin = admin;
    sender.firestore = app.firestore();
    sender.firestore.settings({ timestampsInSnapshots: true });
    sender.auth = app.auth();

    sender.signIn = require('./sign-in')(sender);
    sender.signOut = require('./sign-out')(sender);
    
    return async () => {
      await app.delete();
    };
  }

  beforeEach(() => {
    sender.cleanup = setup(sender);
  });

  afterEach(async () => {
    await sender.cleanup();
  });

}