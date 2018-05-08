import Collection from './-collection';
import { computed } from '@ember/object';

export default Collection.extend({

  queryable: computed(function() {
    return this.store.collection('sources').orderBy('name');
  }).readOnly()

});