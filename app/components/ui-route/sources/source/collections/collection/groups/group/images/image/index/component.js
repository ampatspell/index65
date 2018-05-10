import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';
import delta from 'index65/util/delta';

export default Component.extend({
  classNameBindings: [ ':ui-route--image-index'],

  storage: readOnly('image.data.storage.1024x1024'),

  prev: delta('image', 'images.content', -1),
  next: delta('image', 'images.content', +1),

  click(e) {
    let x = e.clientX;
    let w = window.innerWidth;
    let model;
    if(x < w / 2) {
      model = this.prev;
    } else {
      model = this.next;
    }
    if(!model) {
      return;
    }
    this.router.transitionTo('sources.source.collections.collection.groups.group.images.image', model.id);
  }

});
