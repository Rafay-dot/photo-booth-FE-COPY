/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import './promptStyling.css';

const WaitPrompt = () => {
  return (
    <div className='wait-container'>
      <div className='text-container'>
        <div className='wait-prompt-container'>
          <div className='wait-header-container bungee-text'>
            <h1 className='wait-prompt-header'>Please Wait</h1>
          </div>
          <div className='wait-desc-container'>
            <h1 className='wait-prompt-desc'>YOUR POLAROID IS BEING PRINTED. THIS MIGHT TAKE A COUPLE OF SECONDS</h1>
          </div>
        </div>
      </div>
      <div className='img-container'>
        <img
          className='wait-img'
          src='/assets/images/png/wait-smiley.png'
          alt='Wait Image'
        />
      </div>
    </div>
  )
}

export default WaitPrompt;
