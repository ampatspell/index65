import Route from '@ember/routing/route';
import Breadcrumb from 'index65/routes/-breadcrumb';
import model from 'ember-cli-zuglet/experimental/model/route';
import observed from 'ember-cli-zuglet/experimental/observed';

export default Route.extend(Breadcrumb, {

  model: model({

    type: 'user',

    user: observed(),

    prepare(route, params) {
      let user = this.store.collection('users').doc(params.user_id).existing();

      this.setProperties({
        user
      });

      return user.observers.promise;
    }

  })

});
