import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  model: computed(function() {
    return this.models.model('session/sign-in');
  }).readOnly(),

  actions: {
    save() {
      this.model.save();
    }
  }

});
