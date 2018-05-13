const setup = require('./helpers/setup');
const assert = require('assert');

describe('rules / image', () => {
  setup(this);

  beforeEach(() => {
    this.ref = id => this.client.firestore.doc(`sources/valdis/collections/35mm/groups/1/images/${id}`);
    this.insert = (id=1, props) => this.ref(id+'').set({ identifier: id });
  });

  it('prevents to insert if user is admin', async () => {
    await this.client.signIn('admin');
    await this.client.denied(this.insert());
  });

  it('prevents insert if user is not admin', async () => {
    await this.client.signIn('zeeba');
    await this.client.denied(this.insert());
  });

});
