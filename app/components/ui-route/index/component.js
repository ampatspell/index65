import Component from '@ember/component';

export default Component.extend({
  actions: {
    sources() {
      this.router.transitionTo('sources');
    }
  }
});
