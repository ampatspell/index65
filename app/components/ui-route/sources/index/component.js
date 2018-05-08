import Component from '@ember/component';

export default Component.extend({

  actions: {
    source(source) {
      this.router.transitionTo('sources.source', source);
    }
  }

});
