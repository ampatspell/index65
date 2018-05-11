import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  roles: computed('user.data.roles.[]', function() {
     return this.get('user.data.roles').map(r => r).join(', ');
  }).readOnly(),

  actions: {
    edit(user) {
      this.router.transitionTo('users.user.edit', user.id);
    }
  }

});
