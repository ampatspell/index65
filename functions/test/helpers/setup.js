module.exports = function() {

  const buildTest = require('./build-test');
  const buildApp = require('./build-app');
  const buildAdmin = require('./build-admin');

  const setup = ctx => {
    let test = buildTest();
    let { index, app } = buildApp();
    let admin = buildAdmin();

    ctx.test = test;
    ctx.index = index;
    ctx.app = app;
    ctx.admin = admin;
    ctx.firestore = admin.firestore();
    ctx.storage = admin.storage();
    ctx.bucket = ctx.storage.bucket();
    ctx.auth = admin.auth();

    return () => test.cleanup();
  }

  return sender => {
    beforeEach(() => {
      sender.cleanup = setup(sender);
    });
    afterEach(() => {
      sender.cleanup();
    });
  };
}();