const setup = require('../helpers/setup');
const assert = require('assert');
const assign = Object.assign;

describe('source', () => {
  setup(this);

  beforeEach(() => {
    this.ref = id => this.firestore.doc(`sources/${id}`);
    this.insert = (id='valdis', props) => this.ref(id).set({ name: 'valdis', editors: [ 'indra' ] });
  });

  it('allows to insert if user is admin', async () => {
    await this.signIn('admin');
    await this.insert();
  });

  it('prevents insert if user is not admin', async () => {
    await this.signIn('zeeba');
    try {
      await this.insert();
      assert.ok(false, 'should throw');
    } catch(err) {
      assert.equal(err.code, 'permission-denied');
    }
  });

});
