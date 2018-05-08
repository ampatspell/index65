import Store from 'ember-cli-zuglet/store';
import { inject as service } from '@ember/service';
import { model } from './util/model';

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

  sources: model({ name: 'sources' }),

  restore() {
  },

  async restoreUser(user) {
    let current = this.user;
    if(current && user && user.uid === current.uid) {
      current.set('user', user);
    } else {
      let next = null;
      if(user) {
        next = await this.models.model('user', { user }).restore();
      }
      this.set('user', next);
      current && current.destroy();
    }
  }

});
