const setup = require('./helpers/setup');
const assert = require('assert');

describe('rules / image', () => {
  setup(this);

  beforeEach(() => {
    this.ref = id => this.client.firestore.doc(`sources/valdis/collections/35mm/groups/1/images/${id}`);
    this.insert = (id=1, props) => this.ref(id+'').set({ identifier: id });
  });

  it('allows to insert if user is admin', async () => {
    await this.client.signIn('admin');
    await this.insert();
  });

  it('prevents insert if user is not admin', async () => {
    await this.client.signIn('zeeba');
    try {
      await this.insert();
      assert.ok(false, 'should throw');
    } catch(err) {
      assert.equal(err.code, 'permission-denied');
    }
  });

});
