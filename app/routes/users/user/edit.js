import Route from '@ember/routing/route';
import { inline } from 'ember-cli-zuglet/experimental/route';

export default Route.extend({

  model: inline({

    prepare(route, params) {
      let user = route.modelFor('users.user').user.ref.existing();

      this.setProperties({
        user
      });

      return user.load();
    }

  })

});
