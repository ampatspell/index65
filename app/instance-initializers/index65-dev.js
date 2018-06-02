const experiments = () => {
}

export default {
  name: 'index65:dev',
  after: 'index65:store',
  initialize(app) {
    let config = app.factoryFor('config:environment').class;
    let environment = config.environment;
    if(environment !== 'development') {
      return;
    }
    experiments(app);
  }
};
