import Component from '../item';

export default Component.extend({
  classNameBindings: [':image', ':with-prev-next', ':action'],

  actions: {
    click() {
      this.transitionTo(this.model.image);
    },
    navigate(image) {
      this.transitionTo(image);
    }
  },

  transitionTo(image) {
    this.router.transitionTo('sources.source.collections.collection.groups.group.images.image', image.id);
  }

});
