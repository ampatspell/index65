import Service, { inject as service } from '@ember/service';
import { assert } from '@ember/debug';
import { camelize } from '@ember/string';

export default Service.extend({

  store: service(),
  router: service(),

  rules: null,

  rule(name) {
    let normalized = camelize(name);
    let rule = this.rules[normalized];
    assert(`rule '${name}' not defined`, !!rule);
    return rule;
  },

  validate(name, model) {
    let rule = this.rule(name);
    let context = this.context();
    return rule(context, model);
  },

  async validateAsync(name, model) {
    return await this.validate(name, model);
  },

  saveTransition(transition) {
    this.set('savedTransition', transition);
  },

  retrySavedTransition() {
    let transition = this.savedTransition;
    if(transition) {
      this.set('savedTransition', null);
      transition.retry();
    } else {
      this.router.transitionTo('index');
    }
  }

});
