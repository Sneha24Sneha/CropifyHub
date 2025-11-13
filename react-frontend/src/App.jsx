import React, { Suspense, lazy, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./layouts/layout";
import LandingPage from "./pages/LandingPage";
import LoadingBar from "react-top-loading-bar";

const Crop = lazy(() => import("./pages/Crop"));
const Convert = lazy(() => import("./pages/Convert"));
const Resize = lazy(() => import("./pages/Resize"));
const Thumbnail = lazy(() => import("./pages/Thumbnail"));
const Grayscale = lazy(() => import("./pages/Grayscale"));

// Component that controls the loading bar based on route changes
function TopLoader() {
  const location = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.continuousStart(); // start loading bar on route change
    const timeout = setTimeout(() => {
      ref.current?.complete(); // complete after small delay
    }, 500);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <LoadingBar
      color="rgba(196, 116, 31, 1)"        // customize the color here
      ref={ref}
      height={3}          // height of the line
      shadow={false}      // disable shadow
    />
  );
}

function App() {
  const basenameUrl = import.meta.env.REACT_APP_PUBLIC_URL || "/";

  return (
    <Router basename={basenameUrl}>
      {/* Top loader stays always visible */}
      <TopLoader />

      <Suspense fallback={null}>
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
