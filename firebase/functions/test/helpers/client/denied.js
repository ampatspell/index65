module.exports = function(ctx) {

  const assert = require('assert');

  return async promise => {
    try {
      await promise;
      assert.ok(false, 'should deny');
    } catch(err) {
      assert.equal(err.code, 'permission-denied');
    }
  }
}