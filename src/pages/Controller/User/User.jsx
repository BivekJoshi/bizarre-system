import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import UserCard from "../../../components/Card/UserCard/UserCard";

const User = () => {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" ,alignItems:"center"}}>
        <Typography
          variant="h3"
          sx={{
            color: theme.palette.text.default,
            fontWeight: 700,
            marginBottom: "0.1rem",
          }}
        >
          User
        </Typography>
        <Button variant="outlined">
          Add User
        </Button>
      </Box>

      <br />
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: "1rem",
        }}
      >
        <UserCard/>
      </Grid>
    </>
  );
};

export default User;
