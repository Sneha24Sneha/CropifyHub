import React from "react";

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return <p className="text-danger mt-3">{message}</p>;
}
