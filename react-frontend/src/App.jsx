import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Crop = lazy(() => import("./pages/Crop"));
const Convert = lazy(() => import("./pages/Convert"));
const Resize = lazy(() => import("./pages/Resize"));
const Thumbnail = lazy(() => import("./pages/Thumbnail"));

function App() {
  const basenameUrl = import.meta.env.VITE_PUBLIC_URL || "/";

  return (
    <Router basename={basenameUrl}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/crop" element={<Crop />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/resize" element={<Resize />} />
          <Route path="/thumbnail" element={<Thumbnail />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}
export default App;