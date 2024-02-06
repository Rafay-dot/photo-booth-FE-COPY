/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import ImageGrid from "../../components/imageGrid";
import PrintBtn from "../../components/print_btn";
import CandidHeading from "../../components/candid_header";
import "./styles.css";

let count = 0;
const Collage = () => {
  const location = useLocation();
  const componentRef = useRef(null);
  const photos = location.state?.images;
  const [url, setUrl] = useState<string>("");
  const [photoUrls, setPhotoUrls] = useState<string[]>([...photos]);

  useEffect(() => {
    captureComponent();
  }, [photoUrls]);

  const handlePictureChange = (image: string) => {
    const temparr = [...photoUrls];
    temparr[count] = image;
    count += 1;
    if (count === 4) {
      count = 0;
    }
    setPhotoUrls(temparr);
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
        <div
          className="polaroid"
          ref={componentRef}
        >
          <p className="polaroid-text">CANDID</p>
          <div>
            <ImageGrid imageUrls={photoUrls} />
          </div>
          {/* TODO: Add date functionality */}
          <p className="polaroid-text">XXVII - VII - XV</p>
        </div>
        {/* 8 Pictures Grid + Button */}
        <div className="selection-container">
          <div className="selection-row">
            {photos.slice(0, 4).map((photo: any) => (
              <button key={photo}
                className="image-button"
                onClick={() => {
                  handlePictureChange(photo);
                }}
              >
                {photo ? (
                  <img key={photo}
                    className="candid-image"
                    src={photo}
                    alt="Candid Image"
                  />
                ) : ""}
              </button>
            ))}
          </div>
          <div className="selection-row">
            {photos.slice(4, 8).map((photo: any) => (
              <button key={photo}
                className="image-button"
                onClick={() => {
                  handlePictureChange(photo);
                }}
              >
                {photo ? (
                  <img key={photo}
                    className="candid-image"
                    src={photo}
                    alt="Candid Image"
                  />
                ) : ""}
              </button>
            ))}
          </div>
          {/* Print Button */}
          <div className="selection-row print-btn-placement">
            <PrintBtn onClick={() => { captureComponent(); }}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collage;
