"use strict";

var functions = _interopRequireWildcard(require("firebase-functions"));

var admin = _interopRequireWildcard(require("firebase-admin"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

admin.initializeApp();
let app = new _app.default(admin, functions);
exports.functions = app.handlers;
exports.triggers = app.triggers;
Object.defineProperty(exports, '_app', {
  value: app
});