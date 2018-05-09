import Route from '@ember/routing/route';

export default Route.extend({

  model(params) {
    return this.modelFor('sources').sources.content.findBy('id', params.source_id);
  }

});
