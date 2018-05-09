import Mixin from '@ember/object/mixin';
import { resolve } from 'rsvp';
import { assign } from '@ember/polyfills';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

const key = '__route_ownership';

export default Mixin.create({

  models: service(),

  create(name, props) {
    let routeName = this.routeName;
    return this.models.model(name, assign({ [key]: routeName }, props));
  },

  load(name, props) {
    let model = this.create(name, props);
    return resolve(model.load()).then(() => model);
  },

  deactivate() {
    this._super(...arguments);
    let model = this.currentModel;
    if(!model) {
      return;
    }
    if(get(model, key) !== this.routeName) {
      return;
    }
    model.destroy();
  },

});