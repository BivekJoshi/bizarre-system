import { styled, useTheme } from "@mui/material";
import React from "react";
import "./Loader.css";
const LoaderWrapper = styled("div")(({ theme }) => ({
  position: "fixed",
  top: "50%",
  left: "50%",
  zIndex: 2000,
  width: "100%",
  "& > * + *": {
    marginTop: theme.spacing(2),
  },
}));

const Loader = () => {
  const theme = useTheme();

  return (
    <LoaderWrapper>
      <div>
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        {/* <span style={{ color: theme.palette.text.default }}>Loading...</span> */}
      </div>
    </LoaderWrapper>
  );
};

export default Loader;
