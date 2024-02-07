import React from 'react';
import './index.css'

interface HeadingProps {
  text: string;
}
const CandidHeading: React.FC<HeadingProps> = ({ text }) => {
  return <h1 className='candid-heading'>{text}</h1>;
};

export default CandidHeading;
