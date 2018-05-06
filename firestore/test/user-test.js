const setup = require('../helpers/setup');
const assert = require('assert');
const assign = Object.assign;

describe('user', () => {
  setup(this);

  beforeEach(() => {
    this.uid = async name => (await this.signIn(name)).uid;
    this.get = async uid => (await this.firestore.doc(`users/${uid}`).get()).data();
    this.query = async () => {
      try {
        return await this.firestore.collection('users').get();
      } catch(err) {
        if(err.code === 'permission-denied') {
          return null;
        }
        throw err;
      }
    };
  });

  it('allows to read self as admin', async () => {
    let doc = await this.get(await this.uid('admin'));
    assert.ok(doc);
  });

  it('allows to read self as user', async () => {
    let doc = await this.get(await this.uid('zeeba'));
    assert.ok(doc);
  });

  it('does not allow anonymous to query', async () => {
    await this.signOut();
    let docs = await this.query();
    assert.equal(docs, null);
  });

  it('allows admins to query', async () => {
    await this.signIn('admin');
    let docs = await this.query();
    assert.ok(docs.size > 0);
  });

});
