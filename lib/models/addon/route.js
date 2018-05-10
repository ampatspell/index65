import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { all } from 'rsvp';

export default EmberObject.extend({

  init() {
    this._super(...arguments);
    this.observers = A();
  },

  didCreate() {
  },

  observe(arg, load=true) {
    let observer = arg.observe();
    this.observers.pushObject({ observer, load });
    return observer;
  },

  load() {
    return all(this.observers.filter(hash => hash.load).map(hash => hash.observer.promise));
  },

  willDestroy() {
    this.observers.map(hash => hash.observer.destroy());
    this._super(...arguments);
  }

});