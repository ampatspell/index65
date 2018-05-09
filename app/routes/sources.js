import Route from '@ember/routing/route';
import Model, { load } from 'index65/mixins/route/model';

export default Route.extend(Model, {

  model: load({
    didCreate(route) {
      this.sources = this.store.collection('sources').orderBy('name').query({ type: 'array' });
      this.observe(this.sources, true);
    }
  })

});
