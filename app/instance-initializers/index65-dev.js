const experiments = app => {
  let store = app.lookup('service:store');

  window.addCollection = (source, identifier, name) => {
    return store.doc(`sources/${source}/collections/${identifier}`).new({ name }).save();
  };

  window.addGroup = (source, collection, identifier) => {
    return store.doc(`sources/${source}/collections/${collection}/groups/${identifier}`).new({ identifier }).save();
  };

  window.observed = () => store.observed.map(model => model+'');
}

export default {
  name: 'index65:dev',
  after: 'index65:store',
  initialize(app) {
    let environment = app.factoryFor('config:environment').class.environment;
    if(environment !== 'development') {
      return;
    }
    experiments(app);
  }
};
