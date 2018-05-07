import Service, { inject as service } from '@ember/service';
import { assert } from '@ember/debug';

const rules = {
  'logged-in': ({ user }) => user ? null : 'login',
  'anonymous': ({ user }) => user ? 'logged-in' : null
};

export default Service.extend({

  store: service(),

  async validateAsync(name, model) {
    let rule = rules[name];
    assert(`rule '${name}' not defined`, !!rule);
    let context = {
      store: this.store,
      user:  this.store.user
    };
    return await rule(context, model);
  }

});
