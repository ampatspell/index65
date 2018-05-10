import Component from '@ember/component';

export default Component.extend({

  actions: {
    collection(doc) {
      this.router.transitionTo('sources.source.collections.collection', doc.id);
    }
  }

});
