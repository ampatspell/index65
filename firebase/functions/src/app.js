import handlers from './handlers';
import triggers from './triggers';

export default class App {

  constructor(admin, functions) {
    this.admin = admin;
    this.functions = functions;

    this.config = functions.config();
    this.firestore = admin.firestore();
    this.auth = admin.auth();
    this.storage = admin.storage();
    this.bucket = this.storage.bucket();

    this.handlers = handlers(this);
    this.triggers = triggers(this);
  }

}
