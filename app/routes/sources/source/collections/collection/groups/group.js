import Route from '@ember/routing/route';
import Breadcrumb from 'index65/routes/-breadcrumb';
import model from 'ember-cli-zuglet/experimental/model/route';
import observed from 'ember-cli-zuglet/experimental/observed';

export default Route.extend(Breadcrumb, {

  model: model({

    type: 'group',

    images: observed(),

    prepare(route, params) {
      let collection = route.modelFor('sources.source.collections.collection');
      let group = collection.groups.content.findBy('id', params.group_id);
      let images = group.ref.collection('images').orderBy('identifier').query();

      this.setProperties({
        source: collection.source,
        collection: collection.collection,
        groups: collection.groups,
        group,
        images
      });

      return images.observers.promise;
    }

  })

});
