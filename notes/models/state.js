export default Model.extend({

  user: null,

  async restoreUser(user) {
    // current update or create, destroy existing
    this.set('user', await this.models.model('user', { user }).load());
  }

});