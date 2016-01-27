const colors = require('../vars/colors');
const media = require('../vars/mediaqueries');

module.exports = exports = {
  'button, .button': {
    WebkitTransform: 'translate(1px)',
    transform: 'translate(1px)',
    padding: 15,
    border: `2px solid ${colors.dark}`,
    [media.palm]: {
      padding: 10
    }
  }
};
