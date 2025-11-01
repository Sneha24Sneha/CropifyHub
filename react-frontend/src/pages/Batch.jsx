import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

function BatchProcessor() {
  const [files, setFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);
  const imgRef = useRef(null);
  const cropperRef = useRef(null);
  const [format, setFormat] = useState("PNG");

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setCurrentIndex(0);
    setResults([]);
    showImage(selectedFiles[0]);
  };

  const showImage = (file) => {
    if (cropperRef.current) {
      cropperRef.current.destroy();
    }

    const imgElement = imgRef.current;
    imgElement.src = URL.createObjectURL(file);
    cropperRef.current = new Cropper(imgElement, { viewMode: 1 });
  };

  const saveCurrent = () => {
    if (!cropperRef.current) return;
    const canvas = cropperRef.current.getCroppedCanvas();
    canvas.toBlob((blob) => {
      const newResults = [...results];
      newResults[currentIndex] = { blob, format };
      setResults(newResults);
    }, `image/${format.toLowerCase()}`);
  };

  const nextImage = () => {
    saveCurrent();
    if (currentIndex < files.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      showImage(files[newIndex]);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      showImage(files[newIndex]);
    }
  };

  const finishProcessing = async () => {
    saveCurrent();

    const formData = new FormData();
    results.forEach((r, idx) => {
      formData.append("images", r.blob, `img${idx}.${r.format.toLowerCase()}`);
      formData.append("formats", r.format);
    });

    const res = await fetch("/batch", {
      method: "POST",
      body: formData,
    });
    const html = await res.text();
    document.getElementById("summary").innerHTML = html;
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Batch Image Processor</h2>

      <input
        type="file"
        multiple
        accept="image/*"
        className="form-control mb-3"
        onChange={handleFileChange}
      />

      <div className="text-center">
        <img
          ref={imgRef}
          id="image"
          alt="Preview"
          style={{ maxWidth: "400px", border: "1px solid #ccc" }}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-3 text-center">
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="form-select w-auto d-inline-block me-2"
          >
            <option value="PNG">PNG</option>
            <option value="JPEG">JPEG</option>
            <option value="WEBP">WEBP</option>
          </select>

          <button className="btn btn-secondary me-2" onClick={prevImage}>
            Previous
          </button>
          <button className="btn btn-primary me-2" onClick={nextImage}>
            Next
          </button>
          <button className="btn btn-success" onClick={finishProcessing}>
            Finish
          </button>
        </div>
      )}

      <div id="summary" className="mt-4"></div>
    </div>
  );
}

export default BatchProcessor;

