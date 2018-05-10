import Route from '@ember/routing/route';
import Model, { load } from 'models/mixins/route';

export default Route.extend(Model, {

  model: load({
    didCreate(route, params) {
      let collection = route.modelFor('sources.source.collections.collection');
      this.source = collection.source;
      this.collection = collection.collection;
      this.group = collection.groups.content.findBy('id', params.group_id);
      this.images = this.group.ref.collection('images').orderBy('identifier').query({ type: 'array' });
      this.observe(this.images);
    }
  })

});
