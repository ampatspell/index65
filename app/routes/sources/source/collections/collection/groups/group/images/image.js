import Route from '@ember/routing/route';
import Breadcrumb from 'index65/routes/-breadcrumb';
import model from 'ember-cli-zuglet/experimental/model/route';

export default Route.extend(Breadcrumb, {

  model: model({

    type: 'image',

    prepare(route, params) {
      let group = route.modelFor('sources.source.collections.collection.groups.group');
      let image = group.images.content.findBy('id', params.image_id);

      this.setProperties({
        group: group.group,
        images: group.images,
        image
      });
    }

  })

});
