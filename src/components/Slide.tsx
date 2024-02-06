// Slide.tsx
import React from 'react';
import TextFX from './TextFX';

interface SlideProps {
  backgroundImg: string
}


const Slide: React.FC<SlideProps> = ({backgroundImg}) => {
  return(
    <div className="content__slide">
      <div className="content__img">
        <div className="content__img-inner" style={{ backgroundImage: `url(${backgroundImg})` }}></div>
      </div>
      <TextFX/>
    </div>
  );
};

export default Slide;
