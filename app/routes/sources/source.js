import Route from '@ember/routing/route';

export default Route.extend({

  model(params) {
    let id = params.source_id;
    return this.modelFor('sources').sources.content.findBy('id', id);
  }

});
