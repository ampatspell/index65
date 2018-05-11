import Component from '@ember/component';

export default Component.extend({

  actions: {
    save() {
      this.user.save().then(() => this.done());
    },
    cancel() {
      this.done();
    }
  },

  done() {
    this.router.transitionTo('users.user', this.user.id);
  }

});
