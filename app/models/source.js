import Model from './model';
import { computed } from '@ember/object';
import { model } from 'index65/util/model';

export default Model.extend({

  doc: null, // document provider -- doc wrapper or id + loading + observing

  collections: model({
    name: 'collections',
    props() {
      return { sourceRef: this.doc.ref };
    }
  }),

  load() {
    return this.collections.load().then(() => this);
  },

  toStringExtension() {
    return this.doc.path;
  }

});