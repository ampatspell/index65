import Component from '@ember/component';
import { model } from 'index65/util/model';
import { inject as service } from '@ember/service';

export default Component.extend({

  requirements: service(),

  model: model({ name: 'session/sign-in' }),

  actions: {
    async save() {
      let loggedIn = await this.model.save();
      if(!loggedIn) {
        return;
      }
      this.requirements.retrySavedTransition();
    }
  }

});
