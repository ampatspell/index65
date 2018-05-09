import RouteModel from 'models/route';

export default {
  name: 'models:internal',
  initialize(container) {
    container.register('models:route', RouteModel);
  }
}
