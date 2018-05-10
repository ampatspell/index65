import Component from '../item';

export default Component.extend({
  classNameBindings: [':source', ':action'],

  click() {
    this.router.transitionTo('sources.source', this.model.source.id);
  }

});
