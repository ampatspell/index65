import Route from '@ember/routing/route';
import Secured from './-secured';
import model from 'ember-cli-zuglet/experimental/model/route';
import observed from 'ember-cli-zuglet/experimental/observed';

export default Route.extend(Secured, {

  require: 'member',

  model: model({

    sources: observed(),

    prepare() {
      let sources = this.store.collection('sources').orderBy('name').query();

      this.setProperties({
        sources
      });

      return sources.observers.promise;
    }

  })

});
