import Service from 'requirements/service';
import { inject as service } from '@ember/service';
import rules from '../requirements';

export default Service.extend({

  rules,

  store: service(),

  context() {
    let store = this.store;
    let user = store.user;
    return {
      store,
      user
    };
  }

});
