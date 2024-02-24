/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from "react";
import "./promptStyling.css";
import { useNavigate } from "react-router-dom";
import { useCandidContext } from "../../context/storeContext";
const WaitPrompt = () => {
  const navigate = useNavigate();
  const { numberOfCopies } = useCandidContext();

  useEffect(() => {
    // Redirect to TTS screen after numberOfCopies*30 seconds
    const timeoutId = setTimeout(() => {
      navigate("/");
    }, 30000 * numberOfCopies);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="wait-container">
      <div className="text-container">
        <div className="wait-prompt-container">
          <div className="wait-header-container bungee-text">
            <h1 className="wait-prompt-header">Please Wait</h1>
          </div>
          <div className="wait-desc-container">
            <h1 className="wait-prompt-desc">
              YOUR POLAROID IS BEING PRINTED. THIS MIGHT TAKE A COUPLE OF
              SECONDS
            </h1>
          </div>
        </div>
      </div>
      <div className="img-container">
        <img
          className="wait-img"
          src="/assets/images/png/wait-smiley.png"
          alt="Wait Image"
        />
      </div>
    </div>
  );
};

export default WaitPrompt;
