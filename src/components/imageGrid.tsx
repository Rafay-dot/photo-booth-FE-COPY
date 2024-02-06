import './index.css'

interface images {
  imageUrls: string[];
}

const ImageGrid: React.FC<images> = ({ imageUrls }) => {
  return (
    <div className="image-grid">
      <div key={0} className="image-item-row">
        <div key={0} className="image-item lower-img">
          <img
            src={imageUrls[0]}
            alt="captured image1"
          />
        </div>
        <div key={1} className="image-item">
          <img
            src={imageUrls[1]}
            alt="captured image2"
          />
        </div>
      </div>
      <div key={3} className="image-item-row">
        <div key={3} className="image-item lower-img">
          <img
            src={imageUrls[2]}
            alt="captured image3"
          />
        </div>
        <div key={3} className="image-item">
          <img
            src={imageUrls[3]}
            alt="captured image4"
          />
        </div>
      </div>
    </div>
  );
};
export default ImageGrid;
