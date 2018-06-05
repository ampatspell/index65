import Route from '@ember/routing/route';
import model from 'ember-cli-zuglet/experimental/model/route';
import observed from 'ember-cli-zuglet/experimental/observed';

export default Route.extend({

  model: model({

    users: observed(),

    prepare() {
      let users = this.store.collection('users').orderBy('createdAt', 'desc').query();

      this.setProperties({
        users
      });

      return users.observers.promise;
    }

  })

});
