import Route from '@ember/routing/route';
import Breadcrumb from 'index65/routes/-breadcrumb';
import { inline } from 'ember-cli-zuglet/experimental/route';
import { observed } from 'ember-cli-zuglet/experimental/computed';

export default Route.extend(Breadcrumb, {

  model: inline({

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
