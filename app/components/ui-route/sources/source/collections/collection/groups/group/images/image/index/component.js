import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';
import delta from 'index65/util/delta';

export default Component.extend({
  classNameBindings: [ ':ui-route--image-index'],

  storage: readOnly('image.data.storage.1024x1024'),

  next: delta('image', 'images.content', +1),

  actions: {
    next() {
      let next = this.next;
      if(!next) {
        return;
      }
      this.router.transitionTo('sources.source.collections.collection.groups.group.images.image', next.id);
    }
  }

});
