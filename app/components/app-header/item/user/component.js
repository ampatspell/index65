import Component from '../item';

export default Component.extend({
  classNameBindings: [':user', ':action'],

  click() {
    this.router.transitionTo('users.user', this.model.user.id);
  }

});
