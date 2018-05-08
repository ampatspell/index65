import Route from '@ember/routing/route';

export default Route.extend({

  async model(params) {
    let id = params.source_id;
    let doc = await this.store.sources.doc(id);
    return this.models.model('source', { doc }).load();
  }

});
