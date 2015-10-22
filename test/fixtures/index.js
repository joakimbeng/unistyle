import {dark} from './vars/colors';
import forms from './forms';

const thirdPart = {
  '@font-face': {
    fontFamily: '"3rdPartyFont"',
    src: 'url(3rdPartyFont.woff)'
  },
  'body': {
    backgroundColor: 'white'
  }
};

export default [
  thirdPart,
  {
    '@font-face': {
      fontFamily: '"AppFont"',
      src: 'url(AppFont.woff)'
    },
    'body': {
      color: dark
    }
  },
  forms
];
