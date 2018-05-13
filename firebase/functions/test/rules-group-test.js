const setup = require('./helpers/setup');
const assert = require('assert');

describe('rules / group', () => {
  setup(this);

  beforeEach(() => {
    this.ref = id => this.client.firestore.doc(`sources/valdis/collections/35mm/groups/${id}`);
    this.insert = props => this.ref('1').set(Object.assign({ identifier: 1 }, props));
  });

  it('allows to insert if user is admin', async () => {
    await this.client.signIn('admin');
    await this.insert();
  });

  it('rejects with invalid identifier and additional fields', async () => {
    await this.client.signIn('admin');
    await this.client.denied(this.ref('1').set({}));
    await this.client.denied(this.insert({ identifier: '1' }));
    await this.client.denied(this.insert({ foobar: 'hey' }));
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
