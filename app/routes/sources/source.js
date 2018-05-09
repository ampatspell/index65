import Route from '@ember/routing/route';

export default Route.extend({

  model(params) {
    console.log(this.modelFor('sources')+'');
    return this.modelFor('sources').doc(params.source_id).existing();
  }

});
