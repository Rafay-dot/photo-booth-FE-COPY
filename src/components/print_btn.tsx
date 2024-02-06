/* eslint-disable jsx-a11y/alt-text */
import React, { ButtonHTMLAttributes } from 'react';
import './index.css';

interface PrintButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

const PrintBtn: React.FC<PrintButtonProps> = ({ onClick }) => {
  return (
    <button className="print-btn" onClick={onClick}>
      <div className='transparent-circle'>
        <div className='curved-text-container'>
          <img
            className='printer-img'
            src='/assets/images/png/printer_icon.png'
          />
          <div className='curved-text'>
            <p className='bungee-text'>
              {
                "PRINT YOUR PICTURE "
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

export default PrintBtn
