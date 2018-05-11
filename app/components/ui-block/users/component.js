import Component from '@ember/component';

export default Component.extend({

  actions: {
    select(user) {
      this.router.transitionTo('users.user', user.id);
    }
  }

});
