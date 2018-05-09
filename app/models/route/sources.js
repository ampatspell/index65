import Model from '../model';

export default Model.extend({

  init() {
    this._super(...arguments);
    this.sources = this.store.collection('sources').orderBy('name').query({ type: 'array' });
    this.observer = this.sources.observe();
  },

  load() {
    return this.observer.promise;
  },

  willDestroy() {
    this.observer.destroy();
    this._super(...arguments);
  }

});