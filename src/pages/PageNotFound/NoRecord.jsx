import { Typography, useTheme } from "@mui/material";
import React from "react";
import NoDataImg from "../../assets/NoData.png";

const NoRecord = () => {
  const theme = useTheme();
  return (
    <div style={{ backgroundColor: theme.palette.background.default }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: "#000",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "3rem 0",
        }}
      >
        <div style={{ width: "400px", height: "400px" }}>
          <img
            src={NoDataImg}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "800",
            color: theme.palette.text.default,
          }}
        >
          No records has been added yet.
        </Typography>
        <Typography variant="h7" sx={{ letterSpacing: ".1em" ,color:theme.palette.text.main}}>
          Add a new record by simply clicking the button on top right side.
        </Typography>
      </div>
    </div>
  );
};

export default NoRecord;
