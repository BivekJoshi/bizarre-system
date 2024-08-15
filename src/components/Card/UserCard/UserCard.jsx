import { Grid, Paper, Typography, useTheme } from "@mui/material";
import React from "react";
import MaleProfile from "../../../assets/MaleProfile.png";
import LocalPostOfficeRoundedIcon from "@mui/icons-material/LocalPostOfficeRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const UserCard = () => {
  const theme = useTheme();

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item>
          <div style={{ width: "130px", height: "130px" }}>
            <img
              src={MaleProfile}
              alt="User profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Grid>
        <Grid item>
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.text.default,
              fontWeight: 700,
            }}
          >
            Bivek Prasad Joshi
          </Typography>
          <Typography
            variant="h5"
            sx={{ display: "flex", alignItems: "center", mt: 1 }}
          >
            <LocalPostOfficeRoundedIcon
              sx={{ mr: 1, color: theme.palette.text.default }}
            />
            <div style={{textDecoration:"underline",cursor:"pointer"}}> bvkjosi03@gmail.com</div>
          </Typography>
          <Typography
            variant="h5"
            sx={{ display: "flex", alignItems: "center", mt: 1 }}
          >
            <LocalPhoneRoundedIcon
              sx={{ mr: 1, color: theme.palette.text.default }}
            />
            9865466989
          </Typography>
          <Typography
            variant="h5"
            sx={{ display: "flex", alignItems: "center", mt: 1 }}
          >
            <HomeRoundedIcon
              sx={{ mr: 1, color: theme.palette.text.default }}
            />
            Tangal, Lalitpur
          </Typography>
          <Typography
            variant="h5"
            sx={{ display: "flex", alignItems: "center", mt: 1 }}
          >
            <CalendarMonthRoundedIcon
              sx={{ mr: 1, color: theme.palette.text.default }}
            />
            2027-09-09
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserCard;
