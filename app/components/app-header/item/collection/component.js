import Component from '../item';

export default Component.extend({
  classNameBindings: [':collection', ':action'],

  click() {
    this.router.transitionTo('sources.source.collections.collection', this.model.collection.id);
  }

});
