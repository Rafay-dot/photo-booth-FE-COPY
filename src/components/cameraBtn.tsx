import React, { ButtonHTMLAttributes } from 'react';
import './index.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  captureCount: number;
  onClick: () => void;
}

const CameraButton: React.FC<ButtonProps> = ({ captureCount, onClick }) => {
  const lines = Array.from({ length: 8 }, (_, index) => index + 1);

  return (
    <div
      className='button-container'
      onClick={onClick}
    >
      <div className='capture-circle-overlay'></div>
      <div className='button-grid'>
        <div className='grid-item'>
          <p className='capture-text'>CAPTURE</p>
        </div>
        <div className='circle-grid-item'>
          <div className='capture-circle-outer'>
            <div className='capture-circle-inner'></div>
          </div>
        </div>
        <div className="grid-item">
          <div className='line-container'>
            {lines.map((lineNumber, index) => (
              <div
                key={lineNumber}
                className={`line ${captureCount <= index ? 'default-line' : 'colored-line'}`}>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraButton;
