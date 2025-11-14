import React, { useState } from "react";
import axios from "axios";

import FileInput from "../components/FileInput";
import Button from "../components/Button";
import ImagePreview from "../components/ImagePreview";
import ErrorMessage from "../components/ErrorMessage";

export default function Thumbnail() {
  const [file, setFile] = useState(null);
  const [width, setWidth] = useState(150);
  const [height, setHeight] = useState(150);
  const [thumbnail, setThumbnail] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!file) {
      setError("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("width", width);
    formData.append("height", height);

    setLoading(true);
    setError("");
    setThumbnail(null);

    try {
      const response = await axios.post(
        `${import.meta.env.REACT_APP_WEBSITE_BACKEND_URL}/api/thumbnail`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const { download_url } = response.data;

      setThumbnail(`${import.meta.env.REACT_APP_WEBSITE_BACKEND_URL}${download_url}`); // preview ke liye
      setDownloadUrl(`${import.meta.env.REACT_APP_WEBSITE_BACKEND_URL}${download_url}`); // download ke liye
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.error) setError(err.response.data.error);
      else setError("Thumbnail generation failed. Please try again.");
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
              <h3 className="mb-4 text-primary fw-bold">🖼️ Thumbnail Generator</h3>

              {/* File Input */}
              <FileInput label="Select Image" setFile={setFile} />

              {/* Width & Height */}
              <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
                <input
                  type="number"
                  className="form-control w-50"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="Width (px)"
                />
                <input
                  type="number"
                  className="form-control w-50"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Height (px)"
                />
              </div>

              {/* Generate Button */}
              <Button onClick={handleGenerate} loading={loading}>
                Generate Thumbnail
              </Button>

              {/* Error Message */}
              <ErrorMessage message={error} />

              {/* Thumbnail Preview */}
              {thumbnail && (
                <ImagePreview imageUrl={thumbnail} downloadUrl={downloadUrl} downloadName="thumbnail.png" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
