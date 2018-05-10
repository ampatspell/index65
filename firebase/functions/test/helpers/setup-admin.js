module.exports = function(ctx) {

  const admin = require('firebase-admin');

  let app = admin.app();
  let firestore = app.firestore();
  let auth = app.auth();

  ctx.admin = {
    app,
    auth,
    firestore
  };

  // delete is done by test.cleanup()
  return () => {};
};