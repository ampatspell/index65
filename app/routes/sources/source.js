import Route from '@ember/routing/route';
import Breadcrumb from 'index65/routes/-breadcrumb';
import Model, { load } from 'models/mixins/route';
import { computed } from '@ember/object';

export default Route.extend(Breadcrumb, Model, {

  model: load({

    type: 'source',

    didCreate(route, params) {
      this.sources = route.modelFor('sources');
      this.source = this.sources.sources.content.findBy('id', params.source_id);
      this.collections = this.source.ref.collection('collections').orderBy('name').query({ type: 'array' });
      this.observe(this.collections);
    }
  })

});
