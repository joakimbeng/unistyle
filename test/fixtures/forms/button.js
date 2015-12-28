import {dark} from '../vars/colors';
import {palm} from '../vars/mediaqueries';

export default {
  'button, .button': {
    WebkitTransform: 'translate(1px)',
    transform: 'translate(1px)',
    padding: 15,
    border: `2px solid ${dark}`,
    [palm]: {
      padding: 10
    }
  }
};
