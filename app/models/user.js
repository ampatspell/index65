import Model from './model';
import { readOnly } from '@ember/object/computed';

export default Model.extend({

  user: null,
  doc: null,

  email: readOnly('user.email'),

  isLoading: readOnly('doc.isLoading'),
  exists: readOnly('doc.exists'),

  async restore() {
    this.setProperties(this.store.collection('users').doc(this.user.uid).observe());
    return this;
  },

  willDestroy() {
    this._super(...arguments);
    this.cancel();
  }

});
