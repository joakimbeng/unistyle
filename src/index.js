var resolve = require('path').resolve;
var absurd = require('absurd');
var arrify = require('arrify');
var pixelify = require('pixelify');

module.exports = function compile(opts, cb) {
  opts = opts || {};
  var file = opts.file;
  var output = opts.output;
  var mod = arrify(require(resolve(file)));

  var css = absurd(function (api) {
    mod.forEach(function (decl) {
      api.add(pixelify(decl));
    });
  });

  if (output) {
    css.compileFile(resolve(output), cb);
  } else {
    css.compile(cb);
  }
};
