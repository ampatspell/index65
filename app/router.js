import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('session', function() {
    this.route('sign-up');
    this.route('new');
    this.route('delete');
    this.route('denied');
  });

  this.route('sources', function() {
    this.route('source', { path: ':source_id' }, function() {
      this.route('collections', function() {
        this.route('collection', { path: ':collection_id' }, function() {
          this.route('upload');
          this.route('groups', function() {
            this.route('group', { path: ':group_id' }, function() {
              this.route('images', function() {
                this.route('image', { path: ':image_id' }, function() {
                });
              });
            });
          });
        });
      });
    });
  });

});

export default Router;
