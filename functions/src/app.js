import handlers from './handlers';

export default class App {
  constructor(admin, functions) {
    this.admin = admin;
    this.functions = functions;
    this.handlers = handlers(this);
  }
}
