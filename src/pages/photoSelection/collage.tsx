import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import "./styles.css";
import ImageGrid from "./imageGrid";
import { useLocation } from "react-router-dom";

// const photos = [
//   "https://cdn.pixabay.com/photo/2021/07/30/20/28/montmartre-6510653_960_720.jpg",

//   "https://cdn.pixabay.com/photo/2021/06/27/14/32/raspberry-6368999_960_720.png",

//   "https://cdn.pixabay.com/photo/2019/06/22/18/31/love-4292211_960_720.jpg",
//   "https://cdn.pixabay.com/photo/2021/07/30/20/28/montmartre-6510653_960_720.jpg",
// ];
// const imageUrls1 = photos.map((photo) => photo.source);
let count = 0;
const Collage = () => {
  const location = useLocation();
  const photos = location.state?.images;
  const componentRef = useRef(null);
  const [url, setUrl] = useState<string>("");
  const [photoUrls, setPhotoUrls] = useState<string[]>([...photos]);

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
  useEffect(() => {
    captureComponent();
  }, [photoUrls]);

  return (
    <div className="container">
      <div
        className="board"
        ref={componentRef}
        style={{ background: "black", width: "400px", height: "500px" }}
      >
        <div>
          <ImageGrid imageUrls={photoUrls} />
        </div>
      </div>
      <div className="selection-container">
        <div className="selection-row">
          {photos.slice(0, 4).map((photo: any) => (
            <button
              className="image-button"
              style={{
                width: 200,
                height: 219,
                margin: 10,
                padding: 0,
                background: "transparent",
                border: "#00ff00",
              }}
              onClick={() => {
                handlePictureChange(photo);
              }}
              key={photo}
            >
              {photo ? (
                <img
                  style={{
                    width: 200,
                    height: 219,
                  }}
                  src={photo}
                  alt="selection"
                  key={photo}
                />
              ) : (
                ""
              )}
            </button>
          ))}
        </div>
        <div className="selection-row">
          {photos.slice(4, 8).map((photo: any) => (
            <button
              className="image-button"
              style={{
                width: 200,
                height: 219,
                margin: 10,
                padding: 0,
                background: "transparent",
                border: "#00ff00",
              }}
              onClick={() => {
                handlePictureChange(photo);
              }}
              key={photo}
            >
              {photo ? (
                <img
                  style={{
                    width: 200,
                    height: 219,
                  }}
                  src={photo}
                  alt="selection"
                  key={photo}
                />
              ) : (
                ""
              )}
            </button>
          ))}
        </div>
        <div className="selection-row">
          <a href={url} download="captured-image.jpg">
            <button
              onClick={() => {
                captureComponent();
              }}
            >
              Print
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Collage;
