import Component from '@ember/component';

export default Component.extend({

  actions: {
    group(doc) {
      this.router.transitionTo('sources.source.collections.collection.groups.group', doc.id);
    }
  }

});
