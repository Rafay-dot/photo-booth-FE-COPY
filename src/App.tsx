import React, { useCallback, useRef, useState } from 'react';

import './App.css';
import Webcam from 'react-webcam';

const videoConstraints = {
  width:320,
  height: 680,
  facingMode: "user"
};
export const App = () => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string >('');
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      console.log('srcss',imageSrc)
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <>
      <header>
        <h1>camera app</h1>
      </header>
      {isCaptureEnable || (
        <button onClick={() => setCaptureEnable(true)}>start</button>
      )}
      {isCaptureEnable && (
        <>
          <div>
            <button onClick={() => setCaptureEnable(false)}>end </button>
          </div>
          <div>
            <Webcam
              audio={false}
              width={360}
              height={540}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
          {(
              <a
              href={url}
              download="Example-PDF-document"
              target="_blank"
              rel="noreferrer"
            >
              <button onClick={capture}>capture</button>
            </a>
      )}
        </>
      )}
      {url && (
        <>
          <div>
            <button
              onClick={() => {
                setUrl('');
              }}
            >
              delete
            </button>
          </div>
          <div>
            <img src={url} alt="Screenshot" />
          </div>
        </>
      )}
    </>
  );
};


export default App;
