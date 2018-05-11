import handlers from './handlers';
import triggers from './triggers';

class Config {

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

export default class App {

  constructor(admin, functions) {
    this.admin = admin;
    this.functions = functions;

    this.config = new Config(functions.config());
    this.firestore = admin.firestore();
    this.auth = admin.auth();
    this.storage = admin.storage();
    this.bucket = this.storage.bucket();

    this.handlers = handlers(this);
    this.triggers = triggers(this);
  }

  info(...args) {
    if(this.config.get('environment.logging') === false) {
      return;
    }
    console.log(...args);
  }

}
