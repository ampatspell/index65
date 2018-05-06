"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dasherize = void 0;

const dasherize = string => {
  return string && string.replace(/[A-Z]/g, (char, index) => {
    return (index !== 0 ? '-' : '') + char.toLowerCase();
  });
};

exports.dasherize = dasherize;