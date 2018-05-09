import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({

  model() {
    let source = this.modelFor('sources.source');
    let collections = source.ref.collection('collections').orderBy('name').query({ type: 'array' }).observe();
    // TODO: destroy observer
    return hash({
      source,
      collections,
      _promise: collections.promise
    });
  }

});
