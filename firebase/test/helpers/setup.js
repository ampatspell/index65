module.exports = function(sender) {

  const setupAdmin = require('./setup-admin');
  const setupApp = require('./setup-app');
  const setupClient = require('./setup-client');
  const setupTest = require('./setup-test');

  /*

    sender

      test:  firebase-functions-test instance

      index:  src/index
      app:  src/app

      admin:
        app:  firebase-admin instance
        firestore:  instance

      client:
        app:  firebase instance
        firestore:  instance
        storage:  instance
        auth:  instance

  */

  const setup = () => {
    let destroyables = [
      setupTest(sender),
      setupApp(sender),
      setupAdmin(sender),
      setupClient(sender)
    ];
    return () => Promise.all(destroyables.map(destroy => destroy()));
  }

  beforeEach(() => {
    sender._destroy = setup(sender);
  });

  afterEach(async () => {
    await sender._destroy();
  });

}