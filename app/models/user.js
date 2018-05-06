import Model from './model';
import { readOnly } from '@ember/object/computed';

export default Model.extend({

  user: null,
  doc: null,

  email: readOnly('user.email'),

  async restore() {
    this.set('doc', await this.store.collection('users').doc(this.user.uid).load({ optional: true }));
    return this;
  }

});