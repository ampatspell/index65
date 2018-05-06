const setup = require('../helpers/setup');
const assert = require('assert');
const assign = Object.assign;

describe('source', () => {
  setup(this);

  beforeEach(() => {
    this.ref = id => this.firestore.doc(`sources/${id}`);
    this.insert = (id='valdis', props) => this.ref(id).set({ name: 'valdis', editors: [ 'indra' ] });
    // this.admin = () => this.auth.
  });

  it('insert', async () => {
    await this.insert();
  });

});
