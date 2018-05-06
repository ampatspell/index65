const setup = require('./helpers/setup');
const assert = require('assert');

describe('auth', () => {
  setup(this);

  describe('onCreate', () => {

    beforeEach(() => {
      this.onCreate = this.test.wrap(this.app.triggers.auth.onCreate);
    });

    it('inserts user document', async () => {
      let ref = this.firestore.doc('users/foobar');
      await ref.delete();
      await this.onCreate({ uid: 'foobar', email: 'zeeba@gmail.com', displayName: 'zeeba' });

      let data = (await ref.get()).data();

      assert.ok(data.created_at);
      assert.deepEqual(data, {
        created_at: data.created_at,
        roles: [],
        email: 'zeeba@gmail.com',
        displayName: 'zeeba'
      });
    });

  });

});