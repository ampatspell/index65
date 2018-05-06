"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _string = require("../util/string");

const wrap = (app, parent, name) => require(`./${(0, _string.dasherize)(parent)}/${(0, _string.dasherize)(name)}`).default(app);

const build = (app, parent, names) => names.reduce((res, name) => {
  res[name] = wrap(app, parent, name);
  return res;
}, {});

const buildHash = (app, hash) => Object.keys(hash).reduce((res, key) => {
  res[key] = build(app, key, hash[key]);
  return res;
}, {});

var _default = app => buildHash(app, {
  auth: ['onCreate']
});

exports.default = _default;