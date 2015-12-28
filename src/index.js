'use strict';
var path = require('path');
var toCss = require('to-css');
var flat = require('unistyle-flat');
var pixelify = require('pixelify');
var kebabCase = require('kebab-case');

module.exports = function compile(obj) {
  return new Promise(function (resolve) {
    if (typeof obj === 'string') {
      obj = require(path.resolve(obj));
    }
    resolve(toCss(flat(obj), {
      indent: '\t',
      property: kebabCase,
      value: pixelify
    }));
  });
};
