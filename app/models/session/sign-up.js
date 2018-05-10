import Model from './email';

export default Model.extend({

  async perform(method, email, password) {
    await method.signUp(email, password);
  }

});