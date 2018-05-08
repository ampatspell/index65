import Collection from './-collection';
import { computed } from '@ember/object';

export default Collection.extend({

  sourceRef: null,

  queryable: computed('sourceRef', function() {
    return this.sourceRef.collection('collections').orderBy('name');
  }).readOnly()

});