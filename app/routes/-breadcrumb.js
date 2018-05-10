import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({

  breadcrumbs: service(),

  setupController(controller, model) {
    this.breadcrumbs.remove(controller.model);
    this.breadcrumbs.add(model);
    this._super(...arguments);
  },

  deactivate() {
    this._super(...arguments);
    this.breadcrumbs.remove(this.modelFor(this.routeName));
  }

});
