const pify = require('pify');
const readFile = pify(require('fs').readFile);
const exec = pify(require('child_process').execFile);
const all = require('promise-all');
const join = require('path').join;
const test = require('ava');
const osTmpdir = require('os-tmpdir');
const unistyle = require('../src');

const TMP = osTmpdir();

test('compiles node v4 code to css', async assert => {
  assert.plan(1);
  const res = await all({
    actual: unistyle(require('./fixtures-node-v4')),
    expected: readFile(join(__dirname, 'expected.css'), 'utf8')
  });
  assert.is(res.actual.trim(), res.expected.trim());
});

test('compiles esnext code to css', async assert => {
  assert.plan(1);
  const res = await all({
    actual: unistyle(require('./fixture')),
    expected: readFile(join(__dirname, 'expected.css'), 'utf8')
  });
  assert.is(res.actual.trim(), res.expected.trim());
});

test('compiles babel compiled code to css', async assert => {
  assert.plan(1);
  const res = await all({
    actual: unistyle(require('./fixtures-es5')),
    expected: readFile(join(__dirname, 'expected.css'), 'utf8')
  });
  assert.is(res.actual.trim(), res.expected.trim());
});

test('output file', async assert => {
  assert.plan(1);
  var tmpFile = join(TMP, Number(new Date()) + '_actual.css');
  await exec(join(__dirname, '..', 'bin', 'unistyle'), ['-o', tmpFile, join(__dirname, 'fixtures-es5')]);
  const res = await all({
    actual: readFile(tmpFile, 'utf8'),
    expected: readFile(join(__dirname, 'expected.css'), 'utf8')
  });
  assert.is(res.actual.trim(), res.expected.trim());
});
