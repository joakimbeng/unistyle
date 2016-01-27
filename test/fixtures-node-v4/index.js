const colors = require('./vars/colors');
const forms = require('./forms');

const thirdPart = {
  '@font-face': {
    fontFamily: '"3rdPartyFont"',
    src: 'url(3rdPartyFont.woff)'
  },
  'body': {
    backgroundColor: 'white'
  }
};

module.exports = exports = [
  thirdPart,
  {
    '@font-face': {
      fontFamily: '"AppFont"',
      src: 'url(AppFont.woff)'
    },
    'body': {
      color: colors.dark
    }
  },
  forms
];
