export default class Config {

  constructor(options) {
    this.options = options;
  }

  get(key) {
    let components = key.split('.');
    let value = this.options;
    for(let i = 0; i < components.length; i++) {
      let key = components[i];
      value = value[key];
      if(value === undefined) {
        return undefined;
      }
    }

    if(value === 'true') {
      return true;
    }

    if(value === 'false') {
      return false;
    }

    return value;
  }

}