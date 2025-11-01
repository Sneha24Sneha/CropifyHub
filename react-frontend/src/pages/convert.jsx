import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import FileInput from "../components/FileInput";
import Button from "../components/Button";
import ImagePreview from "../components/ImagePreview";
import ErrorMessage from "../components/ErrorMessage";

export default function Convert() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("JPG");
  const [convertedImage, setConvertedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    if (!file) {
      setError("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("format", format);

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/convert", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setConvertedImage(`data:image/${format.toLowerCase()};base64,${response.data.image_base64}`);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.error) setError(err.response.data.error);
      else setError("Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body text-center p-4">
              <h3 className="mb-4 text-primary fw-bold">🎨 Image Format Converter</h3>

              {/* File Input */}
              <FileInput label="Select Image" setFile={setFile} />

              {/* Format Selector */}
              <div className="mb-4">
                <label className="form-label me-2 fw-semibold">Select Format:</label>
                <select
                  className="form-select w-auto d-inline-block"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                >
                  <option value="JPG">JPG</option>
                  <option value="PNG">PNG</option>
                  <option value="WEBP">WEBP</option>
                </select>
              </div>

              {/* Convert Button */}
              <Button onClick={handleConvert} loading={loading}>
                Convert Image
              </Button>

              {/* Error Message */}
              <ErrorMessage message={error} />

              {/* Converted Image Preview */}
              {convertedImage && (
               <ImagePreview imageUrl={convertedImage} downloadUrl={convertedImage}  downloadName={`converted.${format.toLowerCase()}`} />

              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
