"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlers = _interopRequireDefault(require("./handlers"));

var _triggers = _interopRequireDefault(require("./triggers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App {
  constructor(admin, functions) {
    this.admin = admin;
    this.functions = functions;
    this.config = functions.config();
    this.firestore = admin.firestore();
    this.storage = admin.storage();
    this.bucket = this.storage.bucket();
    this.handlers = (0, _handlers.default)(this);
    this.triggers = (0, _triggers.default)(this);
  }

}

exports.default = App;