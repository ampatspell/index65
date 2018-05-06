import Component from '@ember/component';

export default Component.extend({
  classNameBindings: [':app-row', 'action::no-action', 'disabled:disabled'],

  disabled: false,

  click() {
    if(this.disabled) {
      return;
    }
    this.action && this.action();
  }
  
});
