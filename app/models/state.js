import Model from './model';

export default Model.extend({

  restore() {
    // console.log(this.store.auth.user);
  },

  signUp(email, password) {
    return this.store.auth.methods.email.signUp(email, password);
  }

});
