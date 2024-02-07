/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import ImageGrid from "../../components/imageGrid";
import PrintBtn from "../../components/print_btn";
import CandidHeading from "../../components/candid_header";
import "./styles.css";
import { getTodayDateInRomanNumeral } from "../../utils/helper";

const Collage = () => {
  const location = useLocation();
  const componentRef = useRef(null);
  const photos = location.state?.images;
  const [url, setUrl] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [photoUrls, setPhotoUrls] = useState<string[]>([...photos]);
  const [selectedPhotosIndexes, setSelectedPhotosIndexes] = useState<number[]>([
    0, 1, 2, 3,
  ]);

  useEffect(() => {
    captureComponent();
  }, [photoUrls]);

  const handlePictureChange = (image: string, imageIndex: number) => {
    const temp_selectedPhotos = [...photoUrls];
    const temp_selectedPhotosIndexes = [...selectedPhotosIndexes];
    temp_selectedPhotos[selectedIndex] = image;
    temp_selectedPhotosIndexes[selectedIndex] = imageIndex;
    if (selectedIndex === 3) {
      setSelectedIndex(0);
    } else setSelectedIndex((prevCount) => (prevCount += 1));
    setPhotoUrls(temp_selectedPhotos);
    setSelectedPhotosIndexes(temp_selectedPhotosIndexes);
  };
  const captureComponent = async () => {
    if (componentRef.current !== null) {
      const canvas = await html2canvas(componentRef.current);
      const image = canvas.toDataURL("image/jpeg");
      setUrl(image);
    }
  };

  return (
    <div className="container">
      {/* Page Header */}
      <CandidHeading text="SELECT YOUR PICTURES" />
      {/* Page Content */}
      <div className="page-content">
        {/* This is the Collage/Polaroid */}
        <div className="polaroid" ref={componentRef}>
          <p className="polaroid-text">CANDID</p>
          <div>
            <ImageGrid imageUrls={photoUrls} />
          </div>
          {/* TODO: Add date functionality */}
          <p className="polaroid-text">{getTodayDateInRomanNumeral()}</p>
        </div>
        {/* 8 Pictures Grid + Button */}
        <div className="selection-container">
          <div className="selection-row">
            {photos.slice(0, 4).map((photo: any, index: number) => (
              <button
                key={photo}
                className="image-button"
                onClick={() => {
                  handlePictureChange(photo, index);
                }}
              >
                {photo ? (
                  <img
                    key={photo}
                    className={`candid-image
                       ${
                         selectedPhotosIndexes.includes(index)
                           ? "highlight-image"
                           : ""
                       }`}
                    src={photo}
                    alt="Candid Image"
                  />
                ) : (
                  ""
                )}
              </button>
            ))}
          </div>
          <div className="selection-row">
            {photos.slice(4, 8).map((photo: any, index: number) => (
              <button
                key={photo}
                className="image-button"
                onClick={() => {
                  handlePictureChange(photo, index + 4);
                }}
              >
                {photo ? (
                  <img
                    key={photo}
                    className={`candid-image
                       ${
                         selectedPhotosIndexes.includes(index + 4)
                           ? "highlight-image"
                           : ""
                       }`}
                    src={photo}
                    alt="Candid Image"
                  />
                ) : (
                  ""
                )}
              </button>
            ))}
          </div>
          {/* Print Button */}
          <div className="selection-row print-btn-placement">
            <a href={url} download="captured-image.jpeg">
              <PrintBtn
                onClick={() => {
                  captureComponent();
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collage;
