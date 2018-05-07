import Service, { inject as service } from '@ember/service';
import { assert } from '@ember/debug';

export default Service.extend({

  store: service(),
  router: service(),

  rules: null,

  rule(name) {
    let rule = this.rules[name];
    assert(`rule '${name}' not defined`, !!rule);
    return rule;
  },

  async validateAsync(name, model) {
    let rule = this.rule(name);
    let context = this.context();
    return await rule(context, model);
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
