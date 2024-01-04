import "./index.css";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  return (
    <div className="page">
      <div className="centerized-container">
        <div
          className="container"
          onClick={() => {
            navigate("/camera");
          }}
        >
          <div className="word">TOUCH</div>
          <div className="word">TO</div>
          <div className="word">START</div>
        </div>
      </div>
    </div>
  );
};

export default Start;
