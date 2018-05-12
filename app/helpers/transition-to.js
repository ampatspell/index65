import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default Helper.extend({

  router: service(),

  compute(params) {
    return (...args) => {
      args = [ ...params, ...args ].filter(arg => arg !== undefined);
      this.router.transitionTo(...args);
    };
  }

});
