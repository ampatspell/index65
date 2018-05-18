import Component from '@ember/component';
import delta from 'index65/util/delta';
import LeftRightMixin from 'index65/mixins/component/keyboard-left-right';

export default Component.extend(LeftRightMixin, {

  prev: delta('group', 'groups.content', -1),
  next: delta('group', 'groups.content', +1),

  actions: {
    previous() {
      this.transitionToGroup(this.prev);
    },
    next() {
      this.transitionToGroup(this.next);
    },
    enter() {
      let doc = this.images.content.firstObject;
      if(!doc) {
        return;
      }
      this.transitionToImage(doc);
    },
    escape() {
      this.back();
    },
    image(doc) {
      this.transitionToImage(doc);
    }
  },

  transitionToGroup(group) {
    if(!group) {
      return;
    }
    this.router.transitionTo('sources.source.collections.collection.groups.group', group.id);
  },

  transitionToImage(doc) {
    this.router.transitionTo('sources.source.collections.collection.groups.group.images.image', doc.id);
  }

});
