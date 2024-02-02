// Slideshow.tsx
import React, { useEffect, useRef } from 'react';
import Slide from './Slide';
import Slideshow from './Animation';

const SlideShow = () => {

  const contentRef = useRef<any>();

  useEffect(()=>{
    new Slideshow(contentRef.current);
  }, [])

  return(
    <div className="content" ref={contentRef}>
      <Slide backgroundImg='/assets/images/jpeg/TTS_1.jpg' />
      <Slide backgroundImg='/assets/images/jpeg/TTS_2.jpeg' />
      <Slide backgroundImg='/assets/images/jpeg/TTS_3.jpeg' />
      <Slide backgroundImg='/assets/images/jpeg/TTS_4.jpg' />
    </div>
  );
};

export default SlideShow;
