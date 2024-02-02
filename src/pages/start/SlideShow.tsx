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
      <Slide backgroundImg='/assets/images/jpeg/14.jpeg' />
      <Slide backgroundImg='/assets/images/jpeg/15.jpeg' />
      <Slide backgroundImg='/assets/images/jpeg/16.jpeg' />
    </div>
  );
};

export default SlideShow;
