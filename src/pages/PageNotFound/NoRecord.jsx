import { Typography, useTheme } from "@mui/material";
import React from "react";

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
        <div style={{ width: "300px", height: "300px" }}>
          <img
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?t=st=1688710340~exp=1688710940~hmac=2cc8632e2b4b000169351f7bd3b74e3307aa59e0081e4c3c9a22b7f0fce46cde"
            alt="No Record Has Been Added Yet"
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
