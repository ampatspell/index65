import Route from '@ember/routing/route';
import Model, { load } from 'models/mixins/route';

export default Route.extend(Model, {

  model: load({
    didCreate(route, params) {
      this.sources = route.modelFor('sources');
      this.source = this.sources.sources.content.findBy('id', params.source_id);
      this.collections = this.source.ref.collection('collections').orderBy('name').query({ type: 'array' });
      this.observe(this.collections);
    }
  })

});
