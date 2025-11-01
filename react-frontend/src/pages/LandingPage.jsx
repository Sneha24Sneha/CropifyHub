import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../styles/style.css";

function LandingPage() {
  return (
    <div className="container">
      <h1 className="title text-center mt-4">Image Converter Tool</h1>
      <div className="row g-4 justify-content-center mt-4">
        <div className="col-md-4">
          <a href="/resize" className="text-decoration-none">
            <div className="card p-3 shadow text-center bg-light text-dark option-card">
              <h4>Resize Image</h4>
              <p>Change image dimensions</p>
            </div>
          </a>
        </div>
        <div className="col-md-4">
          <a href="/crop" className="text-decoration-none">
            <div className="card p-3 shadow text-center bg-light text-dark option-card">
              <h4>Crop Image</h4>
              <p>Cut part of an image</p>
            </div>
          </a>
        </div>
        <div className="col-md-4">
          <a href="/convert" className="text-decoration-none">
            <div className="card p-3 shadow text-center bg-light text-dark option-card">
              <h4>Format Convert</h4>
              <p>JPG ↔ PNG ↔ WEBP</p>
            </div>
          </a>
        </div>
        <div className="col-md-4">
          <a href="/thumbnail" className="text-decoration-none">
            <div className="card p-3 shadow text-center bg-light text-dark option-card">
              <h4>Thumbnail</h4>
              <p>Create small preview images</p>
            </div>
          </a>
        </div>
        <div className="col-md-4">
          <a href="/grayscale" className="text-decoration-none">
            <div className="card p-3 shadow text-center bg-light text-dark option-card">
              <h4>Grayscale Converter</h4>
              <p>Convert Color image to Grayscale Image</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
