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
  doc: null,

  email: readOnly('user.email'),

  exists:    readOnly('doc.exists'),
  isLoading: readOnly('doc.isLoading'),

  roles:     readOnly('doc.data.roles'),
  isAdmin:   hasRole('admin'),
  isMember:  hasRole('member'),

  isAdminOrMember: or('isAdmin', 'isMember'),

  async restore() {
    let ref = this.store.collection('users').doc(this.user.uid);
    this.set('doc', await ref.load());
    return this;
  }

});
