import Route from '@ember/routing/route';

export default Route.extend({

  model(params) {
    // let source = this.modelFor('sources.source');
    // return source.ref.collection('collections').doc(params.collection_id).existing();
  }

});
