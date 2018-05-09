import Model from '../../../model';

export default Model.extend({

  source: null, // doc

  init() {
    this._super(...arguments);
    this.collections = this.source.ref.collection('collections').orderBy('name').query({ type: 'array' });
    this.observer = this.collections.observe();
  },

  load() {
    return this.observer.promise;
  },

  willDestroy() {
    this.observer.destroy();
    this._super(...arguments);
  }

});