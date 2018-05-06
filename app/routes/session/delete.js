import Route from '@ember/routing/route';

export default Route.extend({

  async beforeModel() {
    await this.store.auth.signOut();
    this.transitionTo('index');
  }

});
