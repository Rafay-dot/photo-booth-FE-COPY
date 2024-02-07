import { useNavigate } from "react-router-dom";
import SlideShow from "../../components/SlideShow";
import "./startStyling.css";

const Start = () => {
  const navigate = useNavigate();

  return (
    <div
      className="page"
      onClick={() => {
        navigate("/camera");
      }}
    >
      <div className="frame">
        <p className="frame__tagline">Project by <span className="colored__tagline">Codeyssey</span></p>
      </div>
      <SlideShow></SlideShow>
    </div>
  );
};

export default Start;
