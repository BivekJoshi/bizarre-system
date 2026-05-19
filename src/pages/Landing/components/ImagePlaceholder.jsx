import React from "react";

const ImagePlaceholder = ({ label = "Image", aspect, style }) => (
  <div
    className="cb-img-ph"
    style={{ aspectRatio: aspect || "4 / 3", borderRadius: 14, ...style }}
    aria-label={`${label} placeholder`}
  >
    <span className="cb-img-ph__label">{label}</span>
  </div>
);

export default ImagePlaceholder;
