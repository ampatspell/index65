import { dasherize } from '../util/string';

const handler = (app, name) => require(`./${dasherize(name)}`).default(app);

const wrap = (app, name) => app.functions.https.onCall(handler(app, name));

const build = (app, names) => names.reduce((hash, name) => {
  hash[name] = wrap(app, name);
  return hash;
}, {});

export default app => build(app, [
  'version',
  'token'
]);
