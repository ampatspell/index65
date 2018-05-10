import Model from '../model';

export default Model.extend({

  email: '',
  password: '',

  isSaving: false,
  isError: false,
  error: null,

  didSave() {
    this.setProperties({
      isSaving: false,
      isError: false,
      error: null
    });
    return true;
  },

  saveDidFail(error) {
    this.setProperties({
      isSaving: false,
      isError: true,
      error
    });
    return false;
  },

  async perform() {
  },

  async save() {
    if(this.get('isSaving')) {
      return;
    }

    this.set('isSaving', true);

    let { email, password } = this;
    try {
      await this.perform(this.store.auth.methods.email, email, password);
      return this.didSave();
    } catch(err) {
      return this.saveDidFail(err);
    }
  }

});