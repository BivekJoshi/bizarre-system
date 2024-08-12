import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="ring"></div>
      <div className="ring"></div>
      <div className="ring"></div>
    </div>
  );
};

export default Loader;
