import Route from '@ember/routing/route';
import Breadcrumb from 'index65/routes/-breadcrumb';
import Model, { load } from 'models/mixins/route';
import { computed } from '@ember/object';

export default Route.extend(Breadcrumb, Model, {

  model: load({

    type: 'collection',

    didCreate(route, params) {
      let source = route.modelFor('sources.source');
      this.source = source.source;
      this.collection = source.collections.content.findBy('id', params.collection_id);
      this.groups = this.collection.ref.collection('groups').orderBy('identifier').query({ type: 'array' });
      this.observe(this.groups);
    }
  })

});
