import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import Webcam from "react-webcam";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

const videoConstraints = {
  width: 126,
  height: 145,
  facingMode: "user",
};
export const Camera = () => {
  const navigate = useNavigate();
  const componentRef = useRef(null);
  const webcamRef = useRef<Webcam>(null);
  const [photoUrls, setPhotoUrls] = useState<string[]>(Array(8).fill(""));
  const [countdown, setCountdown] = useState<number>(0);
  const [pictureCount, setPictureCount] = useState<number>(0);

  let count = 0;
  const updatedUrls = Array(8).fill("");
  const capturePhoto = () => {
    setCountdown(2);
    if (count < 8) {
      const image = webcamRef.current?.getScreenshot();
      if (image !== null) {
        updatedUrls[count] = image;

        count += 1;
        setPictureCount(count);
      }

      setTimeout(() => {
        capturePhoto();
      }, 3000);
      setPhotoUrls(updatedUrls);
    }
  };
  const handleClick = () => {
    setTimeout(() => {
      capturePhoto();
    }, 3000);
  };
  useEffect(() => {
    const captureComponent = async () => {
      if (componentRef.current !== null) {
        await html2canvas(componentRef.current);
      }
    };
    captureComponent();
    if (pictureCount === 8) {
      navigate("/template-selector", { state: { images: photoUrls } });
    }
  }, [photoUrls, pictureCount, navigate]);
  return (
    <div className="container">
      {
        <div className="camera-container">
          <div style={{ position: "relative", width: 360, height: 540 }}>
            {/* Webcam */}
            <Webcam
              mirrored={true}
              audio={false}
              width={360}
              height={540}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              style={{ zIndex: 0 }}
            />

            {/* Countdown Image */}

            {countdown !== 0 ? (
              <img
                src={"./countdown.gif"}
                alt="loading..."
                style={{
                  width: "80%",
                  height: "50%",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                }}
              />
            ) : (
              ""
            )}
          </div>

          {
            <button
              onClick={() => {
                handleClick();
              }}
            >
              capture!
            </button>
          }
        </div>
      }
    </div>
  );
};

export default Camera;
