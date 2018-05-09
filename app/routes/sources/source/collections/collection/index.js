import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({

  model(params) {
    let source = this.modelFor('sources.source');
    let collection = this.modelFor('sources.source.collections.collection').observe();
    // TODO: destroy observer
    return hash({
      source,
      collection,
      _promise: collection.promise
    });
  }

});
