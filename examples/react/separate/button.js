import React from 'react';
import cngen from 'cngen';
import buttonStyle from './button-style';

export default class Button extends React.Component {
  render() {
    const buttonClass = cngen(buttonStyle);
    return <button className={buttonClass}>My button</button>;
  }
}
