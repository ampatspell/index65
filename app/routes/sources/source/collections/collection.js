import Route from '@ember/routing/route';
import Model, { load } from 'index65/mixins/route/model';

export default Route.extend(Model, {

  model: load({
    didCreate(route, params) {
      let source = route.modelFor('sources.source');
      this.source = source.source;
      this.collection = source.collections.content.findBy('id', params.collection_id);
    }
  }),

});
