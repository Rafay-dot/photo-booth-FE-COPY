/* eslint-disable jsx-a11y/alt-text */
import React, { ButtonHTMLAttributes } from 'react';
import './index.css';

interface CircularButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  buttonText: string;
  iconUrl: string;
}

const CircularBtn: React.FC<CircularButtonProps> = ({ onClick, buttonText, iconUrl }) => {
  return (
    <button className="print-btn" onClick={onClick}>
      <div className='transparent-circle'>
        <div className='curved-text-container'>
          <img
            className='printer-img'
            src={iconUrl}
          />
          <div className='curved-text'>
            <p className='bungee-text'>
              {
                buttonText
                .split("")
                .map(
                  (char, index) =>
                    <span key={index} style={{transform: `rotate(${index * 19}deg)`}}>{char}</span>
                )
              }
            </p>
          </div>
        </div>
      </div>
    </button>
  )
}

export default CircularBtn
