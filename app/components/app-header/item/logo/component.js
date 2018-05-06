import Component from '../item';

export default Component.extend({
  classNameBindings: [':logo', ':action'],

  click() {
    this.router.transitionTo('index');
  }

});
