const setup = require('./helpers/setup');
const assert = require('assert');
const request = require('./helpers/request');

describe('sanity', () => {
  setup(this);

  it('should have index', () => {
    assert.ok(this.index);
  });

  it('should have app', () => {
    assert.ok(this.app);
  });

  it('should handle version', async () => {
    let { json } = await request(this.app.handlers.version, { method: 'POST', body: { data: {} } });
    assert.deepEqual(json, {
      result: {
        name: 'index65-firebase',
        version: require('../package.json').version
      }
    });
  });

});