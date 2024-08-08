import { styled } from "@mui/material";
import React from "react";
import "./Loader.css";
const LoaderWrapper = styled("div")(({ theme }) => ({
  position: "fixed",
  top: "50%",
  left: "50%",
  zIndex: 2000,
  width: "100%",
//   "& > * + *": {
//     marginTop: theme.spacing(2),
//   },
}));

const mode = "dark";

const Loader = () => (
  <div         style={{
    width: "100%",
    height: "100vh",
    backgroundColor:"red"
  }}>
    <LoaderWrapper>
      <div

      >
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <span style={{ color: mode === "dark" ? "white" : "black" }}>
          Loading...
        </span>
      </div>
    </LoaderWrapper>
  </div>
);

export default Loader;
