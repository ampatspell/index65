import Component from '@ember/component';
import LeftRightMixin from 'index65/mixins/component/keyboard-left-right';

export default Component.extend(LeftRightMixin, {

  actions: {
    previous() {
    },
    next() {
    },
    escape() {
      this.router.transitionTo('sources.source', this.source.id);
    },
    group(doc) {
      this.router.transitionTo('sources.source.collections.collection.groups.group', doc.id);
    },
    edit() {
      this.router.transitionTo('sources.source.collections.collection.edit', this.collection.id);
    },
    upload() {
      this.router.transitionTo('sources.source.collections.collection.upload', this.collection.id);
    }
  }

});
