import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/start/Start";
import Camera from "./pages/camera/Camera";
import WaitPrompt from "./pages/prompt/waitPrompt";
import MyCollage from "./pages/photoSelection/photoSelection";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/template-selector" element={<MyCollage />} />
        <Route path="/wait-screen" element={<WaitPrompt />} />
      </Routes>
    </Router>
  );
};

export default App;
