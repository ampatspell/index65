import Model from '../../../../../model';

export default Model.extend({

  collection: null, // doc

  init() {
    this._super(...arguments);
    this.observer = this.collection.observe();
  },

  load() {
    return this.observer.promise;
  },

  willDestroy() {
    this.observer.destroy();
    this._super(...arguments);
  }

});