module.exports = function() {

  const test = require('firebase-functions-test');
  const path = require('path');

  const account = path.resolve(path.join(__dirname, '../../../service-account-key.json'));
  const config = require(path.resolve(path.join(__dirname, '../../../config.json')));

  let instance = test(config, account);

  instance.mockConfig({
  });

  return instance;

}
