import { A } from '@ember/array';
import { defer } from 'rsvp';

export default (array, max, fn) => {
  let deferred = defer();
  let errors = [];
  let running = A();

  const error = err => errors.push(err);
  const push   = promise => running.pushObject(promise);
  const remove = promise => running.removeObject(promise);

  const invoke = task => {
    let promise = fn(task);
    push(promise);
    promise.then(() => {
      remove(promise);
      enqueue();
    }, err => {
      remove(promise);
      error(err);
    });
  }

  const done = () => {
    if(errors.length) {
      let err = new Error(`Throttle failed with ${errors.length} error${errors.length === 1 ? '' : 's'}`);
      err.code = 'throttle';
      err.errors = errors;
      deferred.reject(err);
    } else {
      deferred.resolve();
    }
  }

  const enqueue = () => {
    let task = array.shift();
    if(task) {
      invoke(task);
    } else if(running.length === 0) {
      done();
    }
  };

  for(let i = 0; i < max; i++) {
    enqueue();
  }

  return deferred.promise;
};
