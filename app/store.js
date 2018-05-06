import Store from 'ember-cli-zuglet/store';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { model } from 'index65/util/model';

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

export default Store.extend({

  options,

  models: service(),
  user: null,

  restore() {
  },

  async restoreUser(user) {
    this.set('user', await this.models.model('user', { user }).restore());
  }

});
