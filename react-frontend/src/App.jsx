import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Crop from "./pages/crop";
import Convert from "./pages/convert";
import Resize from "./pages/resize";
import Thumbnail from "./pages/thumbnail";

function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/crop" element={<Crop />} />
        <Route path="/convert" element={<Convert />} />
        <Route path="/resize" element={<Resize />} />
        <Route path="/thumbnail" element={<Thumbnail />} />
      </Routes>
    </Router>

  );
}

export default App;
