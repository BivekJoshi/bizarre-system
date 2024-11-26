import {
  Grid,
  Paper,
  Typography,
  Avatar,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import MaleProfile from "../../../assets/MaleProfile.png";
import FemaleProfile from "../../../assets/FemaleProfile.png";
import LocalPostOfficeRoundedIcon from "@mui/icons-material/LocalPostOfficeRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { DOC_URL } from "../../../api/axiosInterceptor";

const UserCard = ({ data }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const imageFinal = data?.user?.profilePictureUrl
    ? DOC_URL + data?.user?.profilePictureUrl
    : data?.user?.gender === "MALE"
      ? MaleProfile
      : data?.user?.gender === "FEMALE"
        ? FemaleProfile
        : null;

  const avatarSize = isSmallScreen ? 80 : isMediumScreen ? 90 : 100;
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "16px",
        backgroundColor: theme.palette.background.paper,
        maxWidth: "500px",
        mx: "auto",
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Avatar
            src={imageFinal}
            alt="User profile"
            sx={{
              width: avatarSize,
              height: avatarSize,
              border: `2px solid ${theme.palette.primary.main}`,
              boxShadow: theme.shadows[3],
            }}
          />
        </Grid>

        <Grid item xs={12} sm={8}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              color={theme.palette.text.primary}
            >
              {data?.user?.fullName || "User Name"}
            </Typography>
            <IconButton sx={{ color: theme.palette.primary.main }}>
              {/* <EditRoundedIcon /> */}
            </IconButton>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", mt: 1 }}
            >
              <LocalPostOfficeRoundedIcon
                sx={{ mr: 1, color: theme.palette.primary.main }}
              />
              <a
                href={`mailto:${data?.user?.email}`}
                style={{
                  textDecoration: "none",
                  color: theme.palette.text.secondary,
                  fontWeight: "medium",
                }}
              >
                {data?.user?.email || "user@example.com"}
              </a>
            </Typography>

            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", mt: 1 }}
            >
              <LocalPhoneRoundedIcon
                sx={{ mr: 1, color: theme.palette.primary.main }}
              />
              {data?.user?.mobileNumber || "No phone number"}
            </Typography>

            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", mt: 1 }}
            >
              <HomeRoundedIcon
                sx={{ mr: 1, color: theme.palette.primary.main }}
              />
              {data?.user?.address || "No address provided"}
            </Typography>

            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", mt: 1 }}
            >
              <CalendarMonthRoundedIcon
                sx={{ mr: 1, color: theme.palette.primary.main }}
              />
              {data?.user?.birthDate || "No birth date"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserCard;
