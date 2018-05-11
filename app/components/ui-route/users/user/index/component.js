import Component from '@ember/component';

export default Component.extend({

  actions: {
    edit(user) {
      this.router.transitionTo('users.user.edit', user.id);
    }
  }

});
