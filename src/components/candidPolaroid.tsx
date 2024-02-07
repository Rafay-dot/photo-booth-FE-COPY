import React, { RefObject } from "react";
import ImageGrid from "./imageGrid";
import { getTodayDateInRomanNumeral } from "../utils/helper";

interface PolaroidProps {
  photoUrls: string[];
  componentRef: RefObject<HTMLDivElement>;
}

const CandidPolaroid: React.FC<PolaroidProps> = ({ photoUrls, componentRef }) => {
  return (
    <div className="polaroid" ref={componentRef}>
      <p className="polaroid-text">CANDID</p>
      <div>
        <ImageGrid imageUrls={photoUrls} />
      </div>
      <p className="polaroid-text">{getTodayDateInRomanNumeral()}</p>
    </div>
  );
};

export default CandidPolaroid;
