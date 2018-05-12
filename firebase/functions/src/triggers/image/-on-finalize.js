import murl from 'murl';

export default (app, pattern, fn) => {
  let matcher = murl(pattern);
  return app.functions.storage.object().onFinalize(async object => {
    let name = object.name;
    let match = matcher(name);
    if(!match) {
      app.info('skip', name);
      return;
    }
    app.info('process', name);
    await fn(object, match);
  });
}
