import Component from '@ember/component';

export default Component.extend({

  sources: null, // Query

  actions: {
    source(source) {
      this.router.transitionTo('sources.source', source.id);
    },
    add() {
      this.router.transitionTo('sources.new');
    }
  }

});
