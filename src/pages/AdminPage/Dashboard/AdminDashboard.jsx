import { useTheme } from "@emotion/react";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const AdminDashboard = () => {
  const theme = useTheme();
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          color: theme.palette.text.default,
          fontWeight: 700,
          marginBottom: "0.1rem",
        }}
      >
        Dashboard
      </Typography>
      <Box>
        
      </Box>
    </>
  );
};

export default AdminDashboard;
