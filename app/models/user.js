import Model from './model';
import { computed } from '@ember/object';
import { readOnly, or } from '@ember/object/computed';

const hasRole = name => computed('doc.data.roles.[]', function() {
  let roles = this.get('doc.data.roles');
  if(!roles) {
    return;
  }
  return roles.find(role => role === name);
}).readOnly();

export default Model.extend({

  user: null,
  uid: readOnly('user.uid'),
  email: readOnly('user.email'),

  observer: null,
  doc: readOnly('observer.doc'),

  exists:    readOnly('doc.exists'),
  isLoading: readOnly('doc.isLoading'),

  roles:     readOnly('doc.data.roles'),
  isAdmin:   hasRole('admin'),
  isMember:  hasRole('member'),

  isAdminOrMember: or('isAdmin', 'isMember'),

  screenName: or('doc.data.displayName', 'email'),

  async restore() {
    let ref = this.store.collection('users').doc(this.user.uid);
    let observer = ref.observe();
    this.setProperties({ observer });
    await observer.promise;
    return this;
  },

  cancel() {
    this.observer.cancel();
  },

  willDestroy() {
    this.cancel();
    this._super(...arguments);
  }

});
