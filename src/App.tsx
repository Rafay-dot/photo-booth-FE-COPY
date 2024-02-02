import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/start/Start";
import Camera from "./pages/camera/Camera";
import MyCollage from "./pages/photoSelection/collage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/template-selector" element={<MyCollage />} />
      </Routes>
    </Router>
  );
};

export default App;
