module.exports = function() {

  let index = require('../../dist');
  let app = index._app;

  return { index, app };
}