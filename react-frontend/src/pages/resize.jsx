import React, { useState } from "react";
import axios from "axios";

import FileInput from "../components/FileInput";
import Button from "../components/Button";
import ImagePreview from "../components/ImagePreview";
import ErrorMessage from "../components/ErrorMessage";

export default function Resize() {
  const [file, setFile] = useState(null);
  const [targetSize, setTargetSize] = useState(200);
  const [unit, setUnit] = useState("KB");
  const [convertedImage, setConvertedImage] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResize = async () => {
    if (!file) {
      setError("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("size", targetSize);
    formData.append("unit", unit);

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_WEBSITE_BACKEND_URL}/api/resize`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Set preview and download link
      setConvertedImage(`data:image/jpeg;base64,${response.data.image_base64}`);
      setDownloadUrl(`${import.meta.env.REACT_APP_WEBSITE_BACKEND_URL}${response.data.download_url}`);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.error) setError(err.response.data.error);
      else setError("Resize failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body text-center p-4">
              <h3 className="mb-4 text-primary fw-bold">🖼️ Image Size Converter</h3>

              {/* File Input */}
              <FileInput label="Select Image" setFile={setFile} />

              {/* Target Size Input */}
              <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
                <label className="form-label mb-0">Target Size:</label>
                <input
                  type="number"
                  className="form-control w-25"
                  value={targetSize}
                  onChange={(e) => setTargetSize(e.target.value)}
                />
                <select
                  className="form-select w-auto"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                >
                  <option value="KB">KB</option>
                  <option value="MB">MB</option>
                </select>
              </div>

              {/* Resize Button */}
              <Button onClick={handleResize} loading={loading}>
                Resize Image
              </Button>

              {/* Error Message */}
              <ErrorMessage message={error} />

              {/* Converted Image Preview */}
              {convertedImage && (
                <ImagePreview imageUrl={convertedImage} downloadUrl={downloadUrl} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
