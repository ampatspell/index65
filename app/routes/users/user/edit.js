import Route from '@ember/routing/route';
import model from 'ember-cli-zuglet/experimental/model/route';

export default Route.extend({

  model: model({

    prepare(route) {
      let user = route.modelFor('users.user').user.ref.existing();

      this.setProperties({
        user
      });

      return user.load();
    }

  })

});
