/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import CircularBtn from "../../components/circularBtn";
import CandidHeading from "../../components/candidHeader";
import CandidPolaroid from "../../components/candidPolaroid";
import "./polaroidStyling.css";

const PhotoSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
  const printClick = async () => {
    await captureComponent();
    navigate("/wait-screen");
  }

  return (
    <div className="container">
      {/* Page Header */}
      <CandidHeading text="SELECT YOUR PICTURES" />
      {/* Page Content */}
      <div className="page-content">
        {/* This is the Collage/Polaroid */}
        <CandidPolaroid photoUrls={photoUrls} componentRef={componentRef} />
        {/* 8 Pictures Grid + Button */}
        <div className="selection-container">
          {
            [0, 4].map((row) => (
              <div className="selection-row">
                {photos.slice(0 + row, 4 + row).map((photo: any, index: number) => (
                  <button key={photo}
                    className="image-button"
                    onClick={() => {
                      handlePictureChange(photo, index + row);
                    }}
                  >
                    {photo ? (
                      <img key={photo}
                        className={`candid-image
                          ${ selectedPhotosIndexes.includes(index + row) ? "highlight-image" : "" }`
                        }
                        src={photo}
                        alt="Candid Image"
                      />
                    ) :  "" }
                  </button>
                ))}
              </div>
            ))
          }
          {/* Print Button */}
          <div className="selection-row print-btn-placement">
            <a href={url} download="captured-image.jpg">
              <CircularBtn
                onClick={() => { printClick(); }}
                buttonText="PRINT YOUR PICTURE "
                iconUrl="/assets/images/png/printer_icon.png"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoSelection;
