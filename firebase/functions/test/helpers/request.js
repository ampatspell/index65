module.exports = function() {

  const mocks = require('node-mocks-http');
  const EventEmitter = require('events');

  const defer = () => {
    let resolve;
    let promise = new Promise(resolve_ => {
      resolve = resolve_;
    });

    return {
      resolve,
      promise
    };
  };

  return async (fn, params={}) => {
    let req = mocks.createRequest(Object.assign({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, params));

    let res = mocks.createResponse({
      eventEmitter: EventEmitter
    });

    let deferred = defer();
    res.on('end', () => {
      let data = res._getData();
      deferred.resolve({ json: data, res });
    });
    fn(req, res);

    return deferred.promise;
  };
}();