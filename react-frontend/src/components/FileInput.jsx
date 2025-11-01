import React from "react";

export default function FileInput({ label, setFile }) {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <input
        type="file"
        accept="image/*"
        className="form-control"
        onChange={(e) => setFile(e.target.files[0])}
      />
    </div>
  );
}

