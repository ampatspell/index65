"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var _default = app => app.functions.auth.user().onCreate(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (user) {
    let {
      uid,
      email,
      displayName
    } = user;
    let created_at = new Date();
    let roles = [];
    yield app.firestore.doc(`users/${uid}`).set({
      email,
      displayName,
      created_at,
      roles
    });
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

exports.default = _default;