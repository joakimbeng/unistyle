import {resolve} from 'path';
import absurd from 'absurd';
import arrify from 'arrify';
import pixelify from 'pixelify';

export default function compile({file, output = null}, cb) {
  const mod = arrify(require(resolve(file)));

  const css = absurd(api => mod.forEach(decl => api.add(pixelify(decl))));

  if (output) {
    css.compileFile(resolve(output), cb);
  } else {
    css.compile(cb);
  }
}
