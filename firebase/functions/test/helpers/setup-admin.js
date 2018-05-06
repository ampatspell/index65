module.exports = function(ctx) {

  const admin = require('firebase-admin');

  let app = admin.app();
  let firestore = app.firestore();

  ctx.admin = {
    app,
    firestore
  };

  // delete is done by test.cleanup()
  return () => {};
};