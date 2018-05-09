import Component from '@ember/component';
import { model } from 'index65/util/model';

export default Component.extend({

  actions: {
    collection(doc) {
      this.router.transitionTo('sources.source.collections.collection', doc.id);
    }
  }

});
