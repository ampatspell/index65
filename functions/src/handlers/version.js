export default app => async () => {
  let { name, version } = require('../../package.json');
  return { name, version };
}