import button from './button';

const FIELDS = ['input', 'textarea', 'button'];

export default {
  [FIELDS]: {
    fontSize: 'inherit'
  },
  ...button
};
