var exec = require('child_process').exec;
var readFileSync = require('fs').readFileSync;
var compile = require('../src');
var join = require('path').join;
var test = require('ava');

test('compiles esnext code to css', function (assert) {
  assert.plan(2);
  exec('bin/unistyle ' + join(__dirname, 'fixtures'), function (err, css) {
    assert.error(err, 'No error should occur');
    var actual = css.toString().trim();
    var expected = readFileSync(join(__dirname, 'expected.css'), 'utf8').trim();
    assert.is(actual, expected, 'The correct css should have been compiled');
  });
});

test('accepts raw objects as input', function (assert) {
  assert.plan(2);
  var src = {body: {padding: '10px'}};
  compile({src: src}, function (err, css) {
    assert.error(err, 'No error should occur');
    assert.ok(css);
  });
});
