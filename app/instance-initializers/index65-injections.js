export default {
  name: 'index65:injections',
  initialize(app) {
    app.inject('component', 'router', 'service:router');
    app.inject('component', 'models', 'service:models');

    app.inject('route', 'models', 'service:models');

    app.inject('model', 'models', 'service:models');
    app.inject('model', 'store', 'service:store');
  }
};
