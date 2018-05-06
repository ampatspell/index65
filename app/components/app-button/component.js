import Component from '@ember/component';

export default Component.extend({
  tagName: 'button',
  attributeBindings: [ 'disabled' ],

  click() {
    this.action && this.action();
  }

});
