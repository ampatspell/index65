import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNameBindings: [':app-model-error'],

  model: null,

  error: computed('model.{isError,error}', function() {
    let { error, isError } = this.model;
    if(!isError) {
      return;
    }
    return error.code || error.message;
  }).readOnly(),

});
