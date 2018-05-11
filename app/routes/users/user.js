import Route from '@ember/routing/route';
import Model, { load } from 'models/mixins/route';
import Breadcrumb from 'index65/routes/-breadcrumb';

export default Route.extend(Model, Breadcrumb, {

  model: load({
    type: 'user',
    didCreate(route, params) {
      this.user = this.store.collection('users').doc(params.user_id).existing();
      this.observe(this.user, true);
    }
  })

});
