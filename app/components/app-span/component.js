import Component from '@ember/component';

export default Component.extend({
  classNameBindings: [ ':app-span', 'action:action' ],
  tagName: 'span',

  click() {
    this.action && this.action();
  }

});
