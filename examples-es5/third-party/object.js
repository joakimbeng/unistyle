'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
var thirdParty = {
  body: {
    color: 'black'
  }
};

var myStyles = {
  body: {
    backgroundColor: 'white'
  }
};

exports.default = _extends({}, thirdParty, myStyles);