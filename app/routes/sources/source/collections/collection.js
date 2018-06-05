import Route from '@ember/routing/route';
import Breadcrumb from 'index65/routes/-breadcrumb';
import model from 'ember-cli-zuglet/experimental/model/route';
import observed from 'ember-cli-zuglet/experimental/observed';

export default Route.extend(Breadcrumb, {

  model: model({

    type: 'collection',

    groups: observed(),

    prepare(route, params) {
      let source = route.modelFor('sources.source');
      let collection = source.collections.content.findBy('id', params.collection_id);
      let groups = collection.ref.collection('groups').orderBy('identifier').query();

      this.setProperties({
        source: source.source,
        collection,
        groups
      });

      return groups.observers.promise;
    }

  })

});
