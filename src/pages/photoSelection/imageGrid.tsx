interface images {
  imageUrls: string[];
}

const ImageGrid: React.FC<images> = ({ imageUrls }) => {
  return (
    <div className="image-grid">
      <div key={0} className="image-item-row">
        <div key={0} className="image-item">
          <img
            src={imageUrls[0]}
            alt="captured image1"
            style={{
              height: 500 / 2 + "px",
              width: 400 / 2 + "px",
            }}
          />
        </div>
        <div key={1} className="image-item">
          <img
            src={imageUrls[1]}
            alt="captured image2"
            style={{
              height: 500 / 2 + "px",
              width: 400 / 2 + "px",
            }}
          />
        </div>
      </div>
      <div key={3} className="image-item-row">
        <div key={3} className="image-item">
          <img
            src={imageUrls[2]}
            alt="captured image3"
            style={{
              height: 500 / 2 + "px",
              width: 400 / 2 + "px",
            }}
          />
        </div>
        <div key={3} className="image-item">
          <img
            src={imageUrls[3]}
            alt="captured image4"
            style={{
              height: 500 / 2 + "px",
              width: 400 / 2 + "px",
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default ImageGrid;
