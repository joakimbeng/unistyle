# unistyle

![unistyle logo](https://cdn.rawgit.com/joakimbeng/unistyle/v0.1.0/media/unistyle.svg)

[![Build status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url] [![js-xo-style][codestyle-image]][codestyle-url]

> Write modular and scalable CSS using the next version of ECMAScript.

## Why?

Using ES2015 (and some ES2016) features to write CSS in JavaScript makes it really modular, scalable and gives you in practice all the features of a good CSS pre- or postprocessor, without resorting to a new language. See the example section for [use together with React](#keeping-the-css-in-a-separate-file) for how to avoid the annoying cascading feature of CSS, which is troublesome in large scale CSS.

## Unistyle?

The name is an abbreviation of Uniform Stylesheets. It is also somewhat related to [Universal JavaScript](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) or [what you want to call it](http://blog.getify.com/unimorphic-isoversal-javascript-what/), because of the ability to share the same CSS code written in JavaScript between your frontend component's inline styles and the application's complete CSS.

## Installation

Install `unistyle` using [npm](https://www.npmjs.com/):

```bash
npm install --save unistyle
```

## CLI Usage

```bash
$> unistyle --help

Usage: bin/unistyle [options] <path to module>

Options:
  -o, --output   Output compiled CSS to specified file instead of to stdout  [string]
  -h, --help     Show help  [boolean]
  -v, --version  Show version number  [boolean]

Examples:
  bin/unistyle -o app.css src/styles.js  Compile src/styles.js to app.css
  bin/unistyle -o style.css style        Compile style/index.js to style.css
```

## Examples

### Using modules and variables

_You can use either CommonJS modules or the new [ES2015 modules](http://www.2ality.com/2014/09/es6-modules-final.html) syntax._

In `examples/vars/vars.js`:

```javascript
export const padding = '15px';
export const dark = '#333';
```

In `examples/vars/button.js`:

```javascript
import {padding, dark} from './vars';

export default {
  '.btn': {
    padding,
    border: `1px solid ${dark}`
  }
};
```

In `examples/vars/index.js`:

```javascript
import {padding} from './vars';
import button from './button';

export default {
  body: {
    padding
  },
  ...button
};
```

Compiling to CSS with `unistyle examples/vars` will give the following result:

```css
body, .btn {
  padding: 15px;
}
.btn {
  border: 1px solid #333;
}
```

### Extending declarations

_Every preprocessor I can think of (e.g. LESS, Sass and Stylus) have the ability to extend one CSS declaration with another, for reusability. They all have their own syntax, however with Unistyle you can use the [object spread](https://github.com/sebmarkbage/ecmascript-rest-spread/blob/master/Spread.md) syntax (which you should already be using if Babel is your thing):_

In `examples/extend/common.js`:

```javascript
export const bigAndPadded = {
  fontSize: 100,
  padding: 50
};
```

In `examples/extend/button.js`:

```javascript
import {bigAndPadded} from './common';

export default {
  button: {
    ...bigAndPadded,
    border: '5px solid black'
  }
};
```

Compiling to CSS with `unistyle examples/extend/button` will give the following:

```css
button {
  font-size: 100px;
  padding: 50px;
  border: 5px solid black;
}
```

### Media queries

_Using media queries (which bubbles up to the root) is easier then ever using the [computed property names syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names):_

In `examples/mediaqueries/breakpoints.js`:

```javascript
export const palm = '@media only screen and (max-width: 700px)';
export const small = '@media only screen and (max-width: 1000px)';
```

In `examples/mediaqueries/index.js`:

```javascript
import {palm} from './breakpoints';

export default {
  body: {
    fontSize: 20,
    [palm]: {
      fontSize: 16
    }
  }
};
```

Compiling with `unistyle examples/mediaqueries` will give:

```css
body {
  font-size: 20px;
}
@media only screen and (max-width: 700px) {
  body {
    font-size: 16px;
  }
}
```

### Using Unistyle with React

#### As inline style

A CSS module written for Unistyle is already compatible with [React inline styles](https://facebook.github.io/react/tips/inline-styles.html), so you could just `import`/`require` it like so:

In `examples/react/inline/button-style.js`:

```javascript
export default {
  padding: 15,
  border: '2px solid black'
};
```

In `examples/react/inline/button.js`:

```javascript
import React from 'react';
import buttonStyle from './button-style';

export default class Button extends React.Component {
  render() {
    return <button style={buttonStyle}>My button</button>;
  }
}
```

No compilation step is needed here...


#### Keeping the CSS in a separate file

_Note: this is not limited to React but works with almost any frontend framework/library, if you're using [Browserify](http://browserify.org/), [Webpack](https://webpack.github.io/) or similar._

Using the modules [`cngen`](https://www.npmjs.com/package/cngen) and [`classnameify`](https://www.npmjs.com/package/classnameify) respectively makes it possible to keep all CSS for your React components in its own file. As a bonus you get round the biggest problem with large scale CSS, i.e. the fact that it cascades.

In `examples/react/separate/button-style.js`:

```javascript
export default {
  'padding': 15,
  'border': '2px solid black',
  ':hover': {
    borderColor: 'green'
  }
};
```

In `examples/react/separate/button.js`:

```javascript
import React from 'react';
import cngen from 'cngen';
import buttonStyle from './button-style';

export default class Button extends React.Component {
  render() {
    const buttonClass = cngen(buttonStyle);
    return <button className={buttonClass}>My button</button>;
  }
}
```

In `examples/react/separate/styles.js`:

```javascript
import classnameify from 'classnameify';
import buttonStyle from './button-style';

export default classnameify({
  buttonStyle
});
```

Compiling to CSS with `unistyle examples/react/separate/styles.js`, gives the following CSS:

```css
._cf2b82a {
  padding: 15px;
  border: 2px solid black;
}
._cf2b82a:hover {
  border-color: green;
}
```

### Publishing Unistyle modules to [npm](https://www.npmjs.com/)

Because Unistyle CSS modules are JavaScript only, they are easily reused if you publish them to [npm](https://www.npmjs.com/) after which they can be installed and imported/required.

When publishing a Unistyle CSS module to `npm` I recommend adding [`"unistyle"`](https://www.npmjs.com/browse/keyword/unistyle) as a keyword in your `package.json` for easier discoverability.

#### Using third party modules

When adding third party modules to your app's Unistyle CSS you should export an array instead of an object, for instance with [`normalize-unistyle`](https://www.npmjs.com/package/normalize-unistyle):

```javascript
import normalize from 'normalize-unistyle';
import myStyles from './my-styles';

export default [
  normalize,
  myStyles
];
```

This is to have colliding selectors in `normalize-unistyle` and `myStyles` merged instead of overwritten.

E.g. compiling this (`examples/third-party/object.js`):

```javascript
const thirdParty = {
  body: {
    color: 'black'
  }
};

const myStyles = {
  body: {
    backgroundColor: 'white'
  }
};

export default {
  ...thirdParty,
  ...myStyles
};
```

Will yield the _unexpected_ result:

```css
body {
  background-color: white;
}
```

And instead compiling this (`examples/third-party/array.js`):

```javascript
const thirdParty = {
  body: {
    color: 'black'
  }
};

const myStyles = {
  body: {
    backgroundColor: 'white'
  }
};

export default [
  thirdParty,
  myStyles
];
```

Will yield the _expected_ result:

```css
body {
  color: black;
  background-color: white;
}
```

## What about minification or autoprefixing?

Use existing modules for this.

### Using [`cssmin`](https://www.npmjs.com/package/cssmin) for minification

```bash
npm install --save unistyle cssmin
```

Then you can add a `build` script to `package.json` like so:

```json
{
  "scripts": {
    "build": "unistyle styles/ | cssmin > styles.min.css"
  }
}
```

And then run: `npm run build` to create `styles.min.css`.


### Using [`autoprefixer`](https://www.npmjs.com/package/autoprefixer) for prefixing

```bash
npm install --save unistyle postcss-cli autoprefixer
```

Then you can add a `build` script to `package.json` like so:

```json
{
  "scripts": {
    "build": "unistyle styles/ | postcss --use autoprefixer -o styles.css"
  }
}
```

And then run: `npm run build` to create `styles.css`.


## How does it work?

Unistyle uses [Babel](https://babeljs.io) and [AbsurdJS](http://absurdjs.com/pages/css-preprocessing/) under the hood. Which means you can use all syntax features available in them both. Though I highly recommend you *not* using [AbsurdJS CSS atoms](http://absurdjs.com/pages/css-preprocessing/organic-css/) for the sake of readability.

There is only one difference between the CSS you write with AbsurdJS from that with Unistyle, and that is: CSS properties with number values not equal to `0` are assumed to be pixels and therefore appended with `'px'`, i.e. `{fontSize: 10} => font-size: 10px;` (see [`pixelify`](https://www.npmjs.com/package/pixelify) for more info). This makes your Unistyle modules compatible with [React inline styles](https://facebook.github.io/react/tips/inline-styles.html).

## License

MIT @ Joakim Carlstein

[npm-url]: https://npmjs.org/package/unistyle
[npm-image]: https://badge.fury.io/js/unistyle.svg
[travis-url]: https://travis-ci.org/joakimbeng/unistyle
[travis-image]: https://travis-ci.org/joakimbeng/unistyle.svg?branch=master
[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code%20style-xo-brightgreen.svg?style=flat
