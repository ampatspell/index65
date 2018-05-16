import Model, { err } from '../edit';

export default Model.extend({

  id: null,
  name: null,

  async validate() {
    let { id, name } = this;

    if(!id || id.trim().length !== id.length) {
      throw err('id-invalid');
    }

    id = id.toLowerCase();

    if(!name) {
      throw err('name-required');
    }

    let doc = await this.store.doc(`sources/${id}`).load({ optional: true });
    if(doc.exists) {
      throw err('conflict');
    }

    return { id, name };
  },

  async _save() {
    let { id, name } = await this.validate();
    let doc = this.store.doc(`sources/${id}`).new({ name });
    await doc.save();
    return doc.id;
  }

});