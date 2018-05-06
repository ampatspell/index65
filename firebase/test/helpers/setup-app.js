module.exports = function(ctx) {

  let index = require('../../functions/dist');
  let app = index._app;

  ctx.index = index;
  ctx.app = app;

  return () => {};
}