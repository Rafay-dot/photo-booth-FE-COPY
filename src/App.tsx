import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/start/Start";
import Camera from "./pages/camera/Camera";
import WaitPrompt from "./pages/prompt/waitPrompt";
import PhotoSelection from "./pages/photoSelection/photoSelection";
import CopiesSelection from "./pages/copiesSelection/copiesSelection";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/copies" element={<CopiesSelection />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/polaroid" element={<PhotoSelection />} />
        <Route path="/wait-screen" element={<WaitPrompt />} />
      </Routes>
    </Router>
  );
};

export default App;
