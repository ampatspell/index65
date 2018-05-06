import Component from '@ember/component';
import { computed } from '@ember/object';
import { model } from 'index65/util/model';

export default Component.extend({

  model: model({ name: 'session/sign-in' }),

  actions: {
    save() {
      this.model.save();
    }
  }

});
