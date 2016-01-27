'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _breakpoints = require('./breakpoints');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = {
  body: _defineProperty({
    fontSize: 20
  }, _breakpoints.palm, {
    fontSize: 16
  })
};