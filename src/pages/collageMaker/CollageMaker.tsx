import * as React from "react";
import { render } from "react-dom";

import "./collageMaker.css";

const photos = [
  {
    source:
      "https://cdn.pixabay.com/photo/2021/07/29/20/23/mountains-6508015_960_720.jpg",
    alt: "some trees",
  },
  {
    source:
      "https://cdn.pixabay.com/photo/2021/07/30/20/28/montmartre-6510653_960_720.jpg",
    alt: "some trees",
  },
  {
    source:
      "https://cdn.pixabay.com/photo/2019/06/22/18/31/love-4292211_960_720.jpg",
    alt: "some trees",
  },
  {
    source:
      "https://cdn.pixabay.com/photo/2021/01/29/08/10/musician-5960112_960_720.jpg",
    alt: "some trees",
  },
];

const ImageGrid = ({ imageUrls } : any) => {
  return (
    <div className="image-grid">
      <div className="image-row">
        <img
          src={imageUrls[0]}
          alt={`Image 1`}
          style={{ height: 400 / 2 + "px", width: 274 / 2 + "px" }}
        />
        <img
          src={imageUrls[1]}
          alt={`Image 1`}
          style={{ height: 400 / 2 + "px", width: 274 / 2 + "px" }}
        />
      </div>
      <div className="image-row">
        <img
          src={imageUrls[2]}
          alt={`Image 1`}
          style={{ height: 400 / 2 + "px", width: 274 / 2 + "px" }}
        />
        <img
          src={imageUrls[3]}
          alt={`Image 1`}
          style={{ height: 400 / 2 + "px", width: 274 / 2 + "px" }}
        />
      </div>
    </div>
  );
};

const imageUrls = photos.map((photo) => photo.source);

const MyCollage = () => {
  return (
    <div
      className="board"
      style={{ background: "black", width: "274px", height: "400px" }}
    >
      <div>
        <ImageGrid imageUrls={imageUrls} />
      </div>
    </div>
  );
};

export default MyCollage;
