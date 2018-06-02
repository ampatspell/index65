import Route from '@ember/routing/route';
import Secured from './-secured';
import { inline } from 'ember-cli-zuglet/experimental/route';
import { observed } from 'ember-cli-zuglet/experimental/computed';

export default Route.extend(Secured, {

  require: 'member',

  model: inline({

    sources: observed(),

    prepare(route, params) {
      let sources = this.store.collection('sources').orderBy('name').query();

      this.setProperties({
        sources
      });

      return sources.observers.promise;
    }

  })

});
