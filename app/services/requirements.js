import Service from 'requirements/service';
import { inject as service } from '@ember/service';

const rules = {
  'logged-in': ({ user }) => user ? null : 'login',
  'anonymous': ({ user }) => user ? 'logged-in' : null
};

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
