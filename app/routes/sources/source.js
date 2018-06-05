import Route from '@ember/routing/route';
import Breadcrumb from 'index65/routes/-breadcrumb';
import model from 'ember-cli-zuglet/experimental/model/route';
import observed from 'ember-cli-zuglet/experimental/observed';

export default Route.extend(Breadcrumb, {

  model: model({

    type: 'source',

    collections: observed(),

    prepare(route, params) {
      let id = params.source_id;

      let sources = route.modelFor('sources');
      let source = sources.sources.content.findBy('id', id);
      let collections = source.ref.collection('collections').orderBy('name').query();

      this.setProperties({
        sources,
        source,
        collections
      });

      return collections.observers.promise;
    }

  })

});
