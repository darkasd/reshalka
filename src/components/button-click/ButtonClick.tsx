import React from 'react';
import './ButtonClick.css';

export interface ButtonClickProps {
    text: string;
    onClick(value: string): void;
    isEnabled: boolean;
}

const ButtonClick: React.FC<ButtonClickProps> = (props) => {
  return (
    <button className='button-main' onClick={() => props.onClick(props.text)} disabled={!props.isEnabled}>{props.text}</button>
  );
}

export default ButtonClick;