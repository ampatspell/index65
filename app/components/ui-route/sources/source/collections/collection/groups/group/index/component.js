import Component from '@ember/component';

export default Component.extend({

  actions: {
    image(doc) {
      this.router.transitionTo('sources.source.collections.collection.groups.group.images.image', doc.id);
    }
  }

});
