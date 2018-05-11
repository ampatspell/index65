import Component from '../item';

export default Component.extend({
  classNameBindings: [':users', ':action'],

  click() {
    this.router.transitionTo('users');
  }

});
