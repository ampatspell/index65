import Route from '@ember/routing/route';
import Breadcrumb from 'index65/routes/-breadcrumb';
import { inline } from 'ember-cli-zuglet/experimental/route';
import { observed } from 'ember-cli-zuglet/experimental/computed';

export default Route.extend(Breadcrumb, {

  model: inline({

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
