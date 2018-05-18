import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';
import delta from 'index65/util/delta';
import LeftRightMixin from 'index65/mixins/component/keyboard-left-right';

export default Component.extend(LeftRightMixin, {
  classNameBindings: [ ':ui-route--image-index'],

  storage: readOnly('image.data.storage.1024x1024'),

  prev: delta('image', 'images.content', -1),
  next: delta('image', 'images.content', +1),

  didUpdateAttrs() {
    this._super(...arguments);
    this.preloadImage(this.prev);
    this.preloadImage(this.next);
  },

  actions: {
    next() {
      this.transitionTo(this.next);
    },
    previous() {
      this.transitionTo(this.prev);
    },
    enter() {
    },
    escape() {
      this.back();
    }
  },

  click(e) {
    let x = e.clientX;
    let w = window.innerWidth;
    let model;
    if(x < w / 2) {
      model = this.prev;
    } else {
      model = this.next;
    }
    this.transitionTo(model);
  },

  transitionTo(model) {
    if(!model) {
      return;
    }
    this.router.transitionTo('sources.source.collections.collection.groups.group.images.image', model.id);
  },

  preloadImage(model) {
    if(!model) {
      return;
    }
    new Image().src = model.get('data.storage.1024x1024.url');
  }

});
