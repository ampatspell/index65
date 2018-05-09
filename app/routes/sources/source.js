import Route from '@ember/routing/route';

export default Route.extend({

  async model(params) {
    let id = params.source_id;
    let doc = await this.store.sources.doc(id);
    let collections = doc.ref.collection('collections').orderBy('name').query({ type: 'array' });
    let observer = collections.observe();
    console.log(observer);
    // observer.query
    // observer.cancel
    // observer.promise
    return this.models.model('source', { doc }).load();
  }

});
