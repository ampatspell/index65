import Model, { err } from '../edit';

export default Model.extend({

  doc: null,

  name: null,

  init() {
    this._super(...arguments);
    let { name } = this.doc.data.getProperties('name');
    this.setProperties({ name });
  },

  async validate() {
    let { name } = this;

    if(!name) {
      throw err('name-required');
    }

    return { name };
  },

  async _save() {
    let { name } = await this.validate();
    let doc = this.doc.ref.new({ name });
    await doc.save({ merge: true });
    return doc.id;
  }

});