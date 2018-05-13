const setup = require('./helpers/setup');
const assert = require('assert');

describe('rules / source', () => {
  setup(this);

  beforeEach(() => {
    this.ref = id => this.client.firestore.doc(`sources/${id}`);
    this.insert = props => this.ref('valdis').set(Object.assign({ name: 'Valdis' }, props));
  });

  it('allows to insert if user is admin', async () => {
    await this.client.signIn('admin');
    await this.insert();
  });

  it('prevents insert w/o name', async () => {
    await this.client.signIn('admin');
    await this.client.denied(this.insert({ name: null }));
  });

  it('prevents insert with random keys', async () => {
    await this.client.signIn('admin');
    await this.client.denied(this.insert({ foobar: 'hello' }));
  });

  it('prevents insert if user is not admin', async () => {
    await this.client.signIn('zeeba');
    await this.client.denied(this.insert());
  });

});
