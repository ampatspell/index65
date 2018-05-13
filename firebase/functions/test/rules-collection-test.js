const setup = require('./helpers/setup');
const assert = require('assert');

describe('rules / collection', () => {
  setup(this);

  beforeEach(() => {
    this.ref = id => this.client.firestore.doc(`sources/valdis/collections/${id}`);
    this.insert = props => this.ref('35mm').set(Object.assign({ name: '35mm negatives' }, props));
  });

  it('allows to insert if user is admin', async () => {
    await this.client.signIn('admin');
    await this.insert();
  });

  it('rejects with non-string name', async () => {
    await this.client.signIn('admin');
    await this.client.denied(this.ref('35mm').set({}));
    await this.client.denied(this.insert({ name: null }));
    await this.client.denied(this.insert({ name: {} }));
  });

  it('rejects with additional props', async () => {
    await this.client.signIn('admin');
    await this.client.denied(this.insert({ foobar: 'hello' }));
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
