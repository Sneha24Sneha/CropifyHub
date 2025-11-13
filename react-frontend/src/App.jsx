import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout";
import LandingPage from "./pages/LandingPage";

const Crop = lazy(() => import("./pages/Crop"));
const Convert = lazy(() => import("./pages/Convert"));
const Resize = lazy(() => import("./pages/Resize"));
const Thumbnail = lazy(() => import("./pages/Thumbnail"));
const Grayscale = lazy(() => import("./pages/Grayscale"));

function App() {
  const basenameUrl = import.meta.env.REACT_APP_PUBLIC_URL || "/";

  return (
    <Router basename={basenameUrl}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="crop" element={<Crop />} />
            <Route path="convert" element={<Convert />} />
            <Route path="resize" element={<Resize />} />
            <Route path="thumbnail" element={<Thumbnail />} />
            <Route path="grayscale" element={<Grayscale />} />
          </Route>
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}
export default App;