const button = require('./button');

const FIELDS = ['input', 'textarea', 'button'];

module.exports = Object.assign(
  exports,
  {
    [FIELDS]: {
      fontSize: 'inherit'
    }
  },
  button
);
