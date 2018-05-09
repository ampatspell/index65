import Route from '@ember/routing/route';

export default Route.extend({

  model(params) {
    let id = params.source_id;
    return this.store.sources.doc(id);
  }

});
