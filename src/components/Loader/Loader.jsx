import React from "react";
import "./Loader.css";

const Loader = ({ inline = false, label, fullScreen = false }) => {
  const wrapStyle = fullScreen
    ? { height: "100dvh", flexDirection: "column", gap: 16 }
    : inline
      ? { height: "auto", padding: 24, flexDirection: "column", gap: 12 }
      : { minHeight: "60vh", flexDirection: "column", gap: 16 };

  return (
    <div className="bbros-loader-wrap" style={wrapStyle}>
      <div className={`bbros-spinner ${inline ? "bbros-spinner-inline" : ""}`} />
      {label && (
        <span style={{ color: "#78716C", fontSize: 13, fontWeight: 500 }}>
          {label}
        </span>
      )}
    </div>
  );
};

export default Loader;
