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
    collection(doc) {
      this.router.transitionTo('sources.source.collections.collection', doc.id);
    },
    edit() {
      this.router.transitionTo('sources.source.edit', this.source.id);
    }
  }

});
