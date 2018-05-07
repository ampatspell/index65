import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

let savedTransition;

export default Mixin.create({

  requirements: service(),

  requirementNotMet(name, model, response, transition) {
    let mapped = this.requireMapping[response];
    if(mapped === null) {
      return;
    }
    if(this.routeName !== this.loginRouteName) {
      savedTransition = transition;
    }
    this.replaceWith(mapped);
  },

  validateRequirement(name, model, transition) {
    console.log('validate', name, model);
    return this.requirements.validateAsync(name, model).then(response => {
      console.log('response', response);
      if(!response) {
        return;
      }
      return this.requirementNotMet(name, model, response, transition);
    });
  },

  beforeModel(transition) {
    let require = this.get('require');
    return this.validateRequirement(require, null, transition);
  },

  retrySavedTransition() {
    let transition = savedTransition;
    if(transition) {
      savedTransition = null;
      transition.retry();
    } else {
      this.transitionTo('index');
    }
  }

});