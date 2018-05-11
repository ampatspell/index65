import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';

export default Component.extend({

  user: readOnly('store.user'),

  actions: {
    logout() {
      this.router.transitionTo('session.delete');
    },
    users() {
      this.router.transitionTo('users');
    }
  }

});
