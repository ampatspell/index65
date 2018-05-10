import Component from '../item';

export default Component.extend({
  classNameBindings: [':group', ':action'],

  click() {
    this.router.transitionTo('sources.source.collections.collection.groups.group', this.model.group.id);
  }

});
