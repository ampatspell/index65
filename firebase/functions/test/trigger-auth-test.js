const setup = require('./helpers/setup');
const assert = require('assert');

describe('trigger / auth', () => {
  setup(this);

  describe('onCreate', () => {

    beforeEach(() => {
      this.onCreate = this.test.wrap(this.app.triggers.auth.onCreate);
    });

    it('inserts user document', async () => {
      let ref = this.admin.firestore.doc('users/foobar');
      await ref.delete();
      await this.onCreate({ uid: 'foobar', email: 'zeeba@gmail.com', displayName: 'zeeba' });

      let data = (await ref.get()).data();

      assert.ok(data.createdAt);
      assert.deepEqual(data, {
        createdAt: data.createdAt,
        roles: [],
        email: 'zeeba@gmail.com',
        displayName: 'zeeba'
      });
    });

  });

});