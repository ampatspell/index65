import EmberObject from '@ember/object';

export default EmberObject.extend({

  init() {
    this._super(...arguments);
    console.log('init', this+'');
  },

  willDestroy() {
    this._super(...arguments);
    console.log('willDestroy', this+'');
  }

});