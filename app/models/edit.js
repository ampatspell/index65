import Model from './model';

export const err = code => {
  let error = new Error(`${code}`);
  error.code = code;
  return error;
};

export default Model.extend({

  isSaving: false,
  isError: false,
  error: null,

  willSave() {
    this.setProperties({
      isSaving: true,
      isError: false,
      error: null
    });
  },

  didSave() {
    this.setProperties({
      isSaving: false
    });
  },

  saveDidFail(err) {
    this.setProperties({
      isSaving: false,
      isError: true,
      error: err
    });
  },

  async save() {
    if(this.isSaving) {
      throw new Error('Saving');
    }
    this.willSave();
    try {
      let result = await this._save()
      this.didSave();
      return result;
    } catch(err) {
      this.saveDidFail(err);
      throw err;
    }
  }

});