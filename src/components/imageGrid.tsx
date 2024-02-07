/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import './index.css';

interface ImagesProps {
  imageUrls: string[];
}

const ImageGrid: React.FC<ImagesProps> = ({ imageUrls }) => {
  return (
    <div className="image-grid">
      {[0, 1].map((rowIndex) => (
        <div key={rowIndex} className="image-item-row">
          {[0, 1].map((colIndex) => (
            <div
              key={rowIndex * 2 + colIndex}
              className={`image-item ${rowIndex % 2 !== 0 ? 'lower-img' : ''}`}
            >
              <img
                src={imageUrls[rowIndex * 2 + colIndex]}
                alt={`captured image${rowIndex * 2 + colIndex + 1}`}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
