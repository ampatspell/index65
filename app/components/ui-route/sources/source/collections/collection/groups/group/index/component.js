import Component from '@ember/component';
import delta from 'index65/util/delta';
import LeftRightMixin from 'index65/mixins/component/keyboard-left-right';

export default Component.extend(LeftRightMixin, {

  prev: delta('group', 'groups.content', -1),
  next: delta('group', 'groups.content', +1),

  actions: {
    previous() {
      this.transitionTo(this.prev);
    },
    next() {
      this.transitionTo(this.next);
    },
    escape() {
      this.back();
    },
    image(doc) {
      this.router.transitionTo('sources.source.collections.collection.groups.group.images.image', doc.id);
    }
  },

  transitionTo(group) {
    if(!group) {
      return;
    }
    this.router.transitionTo('sources.source.collections.collection.groups.group', group.id);
  }

});
