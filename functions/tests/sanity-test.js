const setup = require('./helpers/setup');
const assert = require('assert');
const request = require('./helpers/request');

describe('sanity', () => {
  setup(this);

  it('should let save doc', async () => {
    await this.firestore.doc('sanity/first').set({ ok: true });
    let snapshot = await this.firestore.doc('sanity/first').get();
    assert.deepEqual(snapshot.data(), {
      ok: true
    });
  });

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
        name: 'index65-functions',
        version: require('../package.json').version
      }
    });
  });

});