import Component from '../item';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: [':authentication', ':action'],

  optional: true,

  email: readOnly('store.auth.user.email'),

  click() {
    if(this.email) {
      this.router.transitionTo('session');
    } else {
      this.router.transitionTo('session.new');
    }
  }

});
