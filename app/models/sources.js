import Model from './model';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default Model.extend({

  queryable: computed(function() {
    return this.store.collection('sources').orderBy('name');
  }).readOnly(),

  _internal: computed(function() {
    let query = this.queryable.query({ type: 'array' });
    let { cancel, promise } = query.observe();
    return { query, cancel, promise };
  }).readOnly(),

  query: readOnly('_internal.query'),
  promise: readOnly('_internal.promise'),

  docs: readOnly('query.content'),

  load() {
    return this.promise.then(() => this);
  },

  doc(id) {
    return this.load().then(() => this.docs.findBy('id', id));
  },

  willDestroy() {
    let internal = this.cacheFor('_internal');
    internal && internal.cancel();
    this._super(...arguments);
  }

});