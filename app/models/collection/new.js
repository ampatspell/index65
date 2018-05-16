import Model, { err } from '../edit';

export default Model.extend({

  source: null,

  id: null,
  name: null,

  ref(id) {
    return this.source.ref.collection('collections').doc(id);
  },

  async validate() {
    let { id, name } = this;

    if(!id || id.trim().length !== id.length) {
      throw err('id-invalid');
    }

    id = id.toLowerCase();

    if(!name) {
      throw err('name-required');
    }

    let doc = await this.ref(id).load({ optional: true });
    if(doc.exists) {
      throw err('conflict');
    }

    return { id, name };
  },

  async _save() {
    let { id, name } = await this.validate();
    let doc = this.ref(id).new({ name });
    await doc.save();
    return doc.id;
  }

});