import Route from '@ember/routing/route';
import Model from 'index65/mixins/route/model';

export default Route.extend(Model, {

  model() {
    // let source = this.modelFor('sources.source');
    // let collection = this.modelFor('sources.source.collections.collection');
    // return this.load('route/sources/source/collections/collection/index', { collection });
  }

});
