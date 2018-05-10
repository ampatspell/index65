import Route from '@ember/routing/route';
import Breadcrumb from 'index65/routes/-breadcrumb';
import Model, { load } from 'models/mixins/route';

export default Route.extend(Breadcrumb, Model, {

  model: load({

    type: 'group',

    didCreate(route, params) {
      let collection = route.modelFor('sources.source.collections.collection');
      this.source = collection.source;
      this.collection = collection.collection;
      this.groups = collection.groups;
      this.group = this.groups.content.findBy('id', params.group_id);
      this.images = this.group.ref.collection('images').orderBy('identifier').query({ type: 'array' });
      this.observe(this.images);
    }
  })

});
