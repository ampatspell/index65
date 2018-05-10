import Component from '@ember/component';
import delta from 'index65/util/delta';

export default Component.extend({
  classNameBindings: [ ':prev-next', 'previous:has-prev:no-prev', 'next:has-next:no-next' ],

  model: null,
  array: null,

  previous: delta('model', 'array', -1),
  next:     delta('model', 'array', +1),

  actions: {
    perform(model) {
      if(!model) {
        return;
      }
      this.action && this.action(model);
    }
  }

});
