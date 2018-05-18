import Component from '@ember/component';
import LeftRightMixin from 'index65/mixins/component/keyboard-left-right';

export default Component.extend(LeftRightMixin, {

  actions: {
    previous() {
    },
    next() {
    },
    escape() {
      this.router.transitionTo('sources');
    },
    enter() {
      let doc = this.collections.content.firstObject;
      if(!doc) {
        return;
      }
      this.transitionToCollection(doc);
    },
    collection(doc) {
      this.transitionToCollection(doc);
    },
    edit() {
      this.router.transitionTo('sources.source.edit', this.source.id);
    },
    add() {
      this.router.transitionTo('sources.source.collections.new', this.source.id);
    }
  },

  transitionToCollection(doc) {
    this.router.transitionTo('sources.source.collections.collection', doc.id);
  }

});
