import Route from '@ember/routing/route';
import Breadcrumb from 'index65/routes/-breadcrumb';
import { inline } from 'ember-cli-zuglet/experimental/route';
import { observed } from 'ember-cli-zuglet/experimental/computed';

export default Route.extend(Breadcrumb, {

  model: inline({

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
