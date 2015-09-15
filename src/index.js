var resolve = require('path').resolve;
var absurd = require('absurd');
var arrify = require('arrify');
var pixelify = require('pixelify');

module.exports = function compile(opts, cb) {
  opts = opts || {};
  var src = opts.src;
  var file = opts.file;
  var output = opts.output;
  var mod;

  if (file) {
    mod = arrify(require(resolve(file)));
  } else {
    mod = arrify(src);
  }

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
