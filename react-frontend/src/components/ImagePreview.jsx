import React from "react";

export default function ImagePreview({ imageUrl, downloadUrl,downloadName }) {
  if (!imageUrl) return null;

  return (
    <div className="text-center mt-3">
      <img
        src={imageUrl}
        alt="Preview"
        className="img-thumbnail mb-2"
        style={{ maxWidth: "400px" }}
      />
      {downloadUrl && (
        <a
          href={downloadUrl}
          download={downloadName || "downloaded_image"}
          className="btn btn-success d-block mt-2"
        >
          ⬇️ Download
        </a>
      )}
    </div>
  );
}
