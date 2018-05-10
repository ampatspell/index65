import Component from '../item';

export default Component.extend({
  classNameBindings: [':group', ':with-prev-next', ':action'],

  actions: {
    click() {
      this.transitionTo(this.model.group);
    },
    navigate(group) {
      this.transitionTo(group);
    }
  },

  transitionTo(group) {
    this.router.transitionTo('sources.source.collections.collection.groups.group', group.id);
  }

});
