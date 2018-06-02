import Route from '@ember/routing/route';
import { inline } from 'ember-cli-zuglet/experimental/route';
import { observed } from 'ember-cli-zuglet/experimental/computed';

export default Route.extend({

  model: inline({

    users: observed(),

    prepare(route, params) {
      let users = this.store.collection('users').orderBy('createdAt', 'desc').query();

      this.setProperties({
        users
      });

      return users.observers.promise;
    }

  })

});
