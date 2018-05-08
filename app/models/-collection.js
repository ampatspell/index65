import Model from './model';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { assert } from '@ember/debug';

export default Model.extend({

  queryable: null,

  _internal: computed(function() {
    let queryable = this.queryable;
    assert(`queryable is required`, !!queryable);
    let query = queryable.query({ type: 'array' });
    let { cancel, promise } = query.observe();
    return { query, cancel, promise };
  }).readOnly(),

  query:   readOnly('_internal.query'),
  promise: readOnly('_internal.promise'),
  docs:    readOnly('query.content'),

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