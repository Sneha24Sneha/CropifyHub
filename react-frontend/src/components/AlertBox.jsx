import React from "react";

export default function AlertBox({ message, type = "danger" }) {
  if (!message) return null;

  return <div className={`alert alert-${type} mt-3`}>{message}</div>;
}
