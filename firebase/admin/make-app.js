module.exports = (serviceAccount, opts={}, name='default') => {

  let admin = require('firebase-admin');

  let app = admin.initializeApp(Object.assign({
    credential: admin.credential.cert(serviceAccount)
  }, opts), name);

  return app;
}
