import { Promise } from 'rsvp';

export default {
  name: 'index65:promise',
  initialize() {
    window.Promise = Promise;
  }
};
