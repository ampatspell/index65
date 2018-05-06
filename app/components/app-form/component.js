import Component from '@ember/component';

export default Component.extend({
  tagName: 'form',
  classNameBindings: [':app-form'],

  submit(e) {
    e.preventDefault();
    this.action && this.action();
  }

});
