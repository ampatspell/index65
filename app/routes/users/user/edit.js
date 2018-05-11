import Route from '@ember/routing/route';
import Model, { load } from 'models/mixins/route';

export default Route.extend(Model, {

  model: load({
    didCreate(route) {
      this.user = route.modelFor('users.user').user.ref.existing();
    },
    load() {
      return this.user.load();
    }
  })

});
