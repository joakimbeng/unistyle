import {readFileSync} from 'fs';
import {join} from 'path';
import test from 'ava';
import compile from '../src';

test('compiles esnext code to css', assert => {
  assert.plan(2);
  compile({file: join(__dirname, 'fixtures')}, (err, css) => {
    assert.error(err, 'No error should occur');
    assert.is(css, readFileSync(join(__dirname, 'expected.css'), 'utf8'), 'The correct css should have been compiled');
  });
});
