import { dasherize } from '../util/string';

const wrap = (app, parent, name) => require(`./${dasherize(parent)}/${dasherize(name)}`).default(app);

const build = (app, parent, names) => names.reduce((res, name) => {
  res[name] = wrap(app, parent, name);
  return res;
}, {});

const buildHash = (app, hash) => Object.keys(hash).reduce((res, key) => {
  res[key] = build(app, key, hash[key]);
  return res;
}, {});

export default app => buildHash(app, {
  auth: [ 'onCreate' ],
  user: [ 'onWrite' ],
  image: [ 'onFinalize', 'onDelete' ]
});
