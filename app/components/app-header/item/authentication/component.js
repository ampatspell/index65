import Component from '../item';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: [':authentication', ':action'],

  optional: true,

  user: readOnly('store.user'),

  click() {
    if(this.user) {
      this.router.transitionTo('session');
    } else {
      this.router.transitionTo('session.new');
    }
  }

});
