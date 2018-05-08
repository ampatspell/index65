import Model from './model';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { assert } from '@ember/debug';

export default Model.extend({

  ref: null,

  _internal: computed(function() {
    let ref = this.ref;
    assert(`ref is required`, !!ref);
    let { doc, cancel, promise } = ref.observe();
    return { doc, cancel, promise };
  }).readOnly(),

  promise: readOnly('_internal.promise'),
  doc:     readOnly('_internal.doc'),

  load() {
    return this.promise.then(() => this);
  },

  willDestroy() {
    let internal = this.cacheFor('_internal');
    internal && internal.cancel();
    this._super(...arguments);
  }

});