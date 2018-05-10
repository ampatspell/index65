import Component from '@ember/component';
import { model } from 'index65/util/model';

export default Component.extend({

  model: model({ name: 'session/sign-up' }),

  actions: {
    async save() {
      let loggedIn = await this.model.save();
      if(!loggedIn) {
        return;
      }
      this.router.transitionTo('session');
    }
  }

});
