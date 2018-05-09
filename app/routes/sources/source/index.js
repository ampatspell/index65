import Route from '@ember/routing/route';
import Model, { load } from 'index65/mixins/route/model';

export default Route.extend(Model, {

  model: load({
    didCreate(route) {
      this.source = route.modelFor('sources.source');
      this.collections = this.source.ref.collection('collections').query({ type: 'array' });
      this.observe(this.source);
      this.observe(this.collections);
    }
  }),

});
