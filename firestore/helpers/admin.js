module.exports = function() {

  const path = require('path');
  const account = path.resolve(path.join(__dirname, '../../service-account-key.json'));
  const config = require(path.resolve(path.join(__dirname, '../../config.json')));

  const admin = require('firebase-admin');

  let app = admin.initializeApp({
    credential: admin.credential.cert(account),
    databaseURL: config.databaseURL
  });

  return app;
};