import {dark} from '../vars/colors';
import {palm} from '../vars/mediaqueries';

export default {
  'button, .button': {
    padding: 15,
    border: `2px solid ${dark}`,
    [palm]: {
      padding: 10
    }
  }
};
