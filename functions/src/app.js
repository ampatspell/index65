const handler = name => {
  let fn = require(`./handlers/${name}`).default;
  console.log(fn);
  return fn;
};

export default class App {
  constructor(admin, functions) {
    this.admin = admin;
    this.functions = functions;
    this.handlers = {
      version: functions.https.onCall(handler('version'))
    }
  }
}
