import React from "react";

export default function Button({ onClick, loading, children, type = "button" }) {
  return (
    <button
      type={type}
      className="btn btn-primary w-100"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "Processing..." : children}
    </button>
  );
}
