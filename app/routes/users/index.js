import Route from '@ember/routing/route';
import Model, { load } from 'models/mixins/route';

export default Route.extend(Model, {

  model: load({
    didCreate() {
      this.users = this.store.collection('users').orderBy('createdAt', 'desc').query({ type: 'array' });
      this.observe(this.users, true);
    }
  })

});
