var exec = require('child_process').exec;
var readFileSync = require('fs').readFileSync;
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
