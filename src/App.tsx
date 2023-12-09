import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from './pages/start/Start';
// import TemplateSelector from './components/TemplateSelector';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        {/* <Route path="/template-selector" element={<TemplateSelector />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
