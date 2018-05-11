import Route from '@ember/routing/route';
import Model, { load } from 'models/mixins/route';

export default Route.extend(Model, {

  model: load({
    didCreate(route, params) {
      this.user = this.store.collection('users').doc(params.user_id).existing();
      this.observe(this.user, true);
    }
  })

});
