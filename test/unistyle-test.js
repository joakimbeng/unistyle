'use strict';
var pify = require('pify');
var readFile = pify(require('fs').readFile);
var exec = pify(require('child_process').execFile);
var all = require('promise-all');
var join = require('path').join;
var test = require('ava');
var osTmpdir = require('os-tmpdir');
var unistyle = require('../src');

var TMP = osTmpdir();

test('compiles esnext code to css', function (assert) {
  assert.plan(1);
  return all({
    actual: unistyle(require('./fixtures')),
    expected: readFile(join(__dirname, 'expected.css'), 'utf8')
  })
  .then(function (res) {
    assert.is(res.actual.trim(), res.expected.trim());
  });
});

test('output file', function (assert) {
  assert.plan(1);
  var tmpFile = join(TMP, Number(new Date()) + '_actual.css');
  return exec('bin/unistyle', ['-o', tmpFile, join(__dirname, 'fixtures')])
    .then(function () {
      return all({
        actual: readFile(tmpFile, 'utf8'),
        expected: readFile(join(__dirname, 'expected.css'), 'utf8')
      });
    })
    .then(function (res) {
      assert.is(res.actual.trim(), res.expected.trim());
    });
});

test('no-babel', function (assert) {
  assert.plan(1);
  return exec('bin/unistyle', ['--no-babel', join(__dirname, 'fixtures')])
    .catch(function (err) {
      assert.regexTest(/SyntaxError/, err.message);
    });
});
