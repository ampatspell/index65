"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _string = require("../util/string");

const handler = (app, name) => require(`./${(0, _string.dasherize)(name)}`).default(app);

const wrap = (app, name) => app.functions.https.onCall(handler(app, name));

const build = (app, names) => names.reduce((hash, name) => {
  hash[name] = wrap(app, name);
  return hash;
}, {});

var _default = app => build(app, ['version']);

exports.default = _default;