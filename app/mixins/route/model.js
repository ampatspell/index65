import Mixin from '@ember/object/mixin';
import { resolve } from 'rsvp';
import { get } from '@ember/object';
import { getOwner } from '@ember/application';

export const load = props => function(params) {
  return resolve(this._super(...arguments)).then(() => this.load(props, params));
};

const key = '__route_name';

export default Mixin.create({

  create(props, params) {
    let routeName = this.routeName;
    let modelFullName = `model:route/${routeName.replace(/\./g, '/')}`;

    let owner = getOwner(this);

    let factory = owner.factoryFor(modelFullName);
    if(!factory) {
      let extended = owner.factoryFor('model:route').class.extend(props).reopenClass({ [key]: routeName });
      owner.register(modelFullName, extended);
      factory = owner.factoryFor(modelFullName);
    }

    let instance = factory.create();
    instance.didCreate(this, params);

    return instance;
  },

  load(props, params) {
    let model = this.create(props, params);
    return resolve(model.load()).then(() => model);
  },

  deactivate() {
    this._super(...arguments);
    let model = this.currentModel;
    if(!model) {
      return;
    }
    if(get(model.constructor, key) !== this.routeName) {
      return;
    }
    model.destroy();
  },

});