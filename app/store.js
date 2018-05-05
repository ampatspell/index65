import Store from 'ember-cli-zuglet/store';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

const options = {
  firebase: {
    apiKey: "AIzaSyCtderAlhwtLpNiI2UTqCqwWYnGzmXs4Ns",
    authDomain: "index65-dev.firebaseapp.com",
    databaseURL: "https://index65-dev.firebaseio.com",
    projectId: "index65-dev",
    storageBucket: "index65-dev.appspot.com",
    // messagingSenderId: "93010984533"
  },
  firestore: {
    persistenceEnabled: true
  }
};

const state = () => computed(function() {
  return this.models.model('state', { store: this });
}).readOnly();

export default Store.extend({

  options,

  models: service(),
  state: state(),

  restore() {
    return this.state.restore();
  }

});
