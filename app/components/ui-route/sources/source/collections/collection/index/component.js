import Component from '@ember/component';
import LeftRightMixin from 'index65/mixins/component/keyboard-left-right';

export default Component.extend(LeftRightMixin, {

  actions: {
    previous() {
    },
    next() {
    },
    enter() {
      let doc = this.groups.content.firstObject;
      if(!doc) {
        return;
      }
      this.transitionToGroup(doc);
    },
    escape() {
      this.router.transitionTo('sources.source', this.source.id);
    },
    group(doc) {
      this.transitionToGroup(doc);
    },
    edit() {
      this.router.transitionTo('sources.source.collections.collection.edit', this.collection.id);
    },
    upload() {
      this.router.transitionTo('sources.source.collections.collection.upload', this.collection.id);
    }
  },

  transitionToGroup(doc) {
    this.router.transitionTo('sources.source.collections.collection.groups.group', doc.id);
  }

});
