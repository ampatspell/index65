import Route from '@ember/routing/route';
import Breadcrumb from 'index65/routes/-breadcrumb';
import Model, { load } from 'models/mixins/route';

export default Route.extend(Breadcrumb, Model, {

  model: load({

    type: 'image',

    didCreate(route, params) {
      let group = route.modelFor('sources.source.collections.collection.groups.group');
      this.image = group.images.content.findBy('id', params.image_id);
      this.images = group.images;
    }
  })

});
