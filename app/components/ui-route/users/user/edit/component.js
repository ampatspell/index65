import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  roles: computed('user.data.roles.[]', function() {
    let values = this.get('user.data.roles');
    let roles = [ 'admin', 'member' ];
    return roles.map(role => {
      return { role, checked: values.includes(role) };
    });
  }),

  actions: {
    updateRole(object, value) {
      let roles = this.get('user.data.roles');
      let role = object.role;
      if(value) {
        roles.addObject(role);
      } else {
        roles.removeObject(role);
      }
    },
    save() {
      let user = this.user;
      user.save().then(() => this.router.transitionTo('users.user', user.id));
    }
  }

});
