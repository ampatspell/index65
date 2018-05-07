import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({

  requirements: service(),

  requirementNotMet(name, model, response, transition) {
    let mapped = this.requireMapping[response];
    if(mapped === null) {
      return;
    }
    if(this.routeName !== this.loginRouteName) {
      this.requirements.saveTransition(transition);
    }
    this.replaceWith(mapped);
  },

  validateRequirement(name, model, transition) {
    return this.requirements.validateAsync(name, model).then(response => {
      if(!response) {
        return;
      }
      return this.requirementNotMet(name, model, response, transition);
    });
  },

  beforeModel(transition) {
    return this.validateRequirement(this.require, null, transition);
  }

});