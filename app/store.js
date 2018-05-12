import Store from 'ember-cli-zuglet/store';
import { inject as service } from '@ember/service';
import environment from './config/environment';

const firebase = environment.index65.firebase;

const options = {
  firebase,
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
    let current = this.user;
    if(current && user && user.uid === current.uid) {
      current.set('user', user);
    } else {
      let next = null;
      if(user) {
        next = await this.models.create('user', { user }).restore();
      }
      this.set('user', next);
      current && current.destroy();
    }
  },

  signOut() {
    let user = this.user;
    user && user.cancel();
    return this.auth.signOut();
  }

});
