const setup = require('./helpers/setup');
const assert = require('assert');

describe('sanity', () => {
  setup(this);

  it('should let save doc', async () => {
    await this.firestore.doc('sanity/first').set({ ok: true });
    let snapshot = await this.firestore.doc('sanity/first').get();
    assert.deepEqual(snapshot.data(), {
      ok: true
    });
  });

});