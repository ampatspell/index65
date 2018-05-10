import Service from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({

  init() {
    this._super(...arguments);
    this.models = A();
  },

  add(model) {
    this.models.pushObject(model);
  },

  remove(model) {
    this.models.removeObject(model);
  }

});