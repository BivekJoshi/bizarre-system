// import React from "react";
// import UserCard from "../../../components/Card/UserCard/UserCard";

// const CustomerCardView = ({ data, setIsEditModalOpen, setRowData }) => {
//   return (
//     <UserCard
//       data={data}
//       setIsEditModalOpen={setIsEditModalOpen}
//       setRowData={setRowData}
//     />
//   );
// };

// export default CustomerCardView;

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
import {
  MonetizationOn,
  AccountBalance,
  EmojiEvents,
  Star,
} from "@mui/icons-material";
import HexagonIcon from "@mui/icons-material/Hexagon";

const CustomerCardView = ({ data, setIsEditModalOpen, setRowData }) => {
  console.log("🚀 ~ data:", data);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const league = data?.league;

  const getIconAndColor = (league) => {
    switch (league) {
      case "SILVER":
        return { icon: <Star />, color: "#C0C0C0" };
      case "GOLD":
        return { icon: <EmojiEvents />, color: "#FFD700" };
      case "PLATINUM":
        return { icon: <AccountBalance />, color: "#E5E4E2" };
      case "BRONZE":
        return { icon: <HexagonIcon />, color: "#CD7F32" };
      default:
        return { icon: <MonetizationOn />, color: "#2196f3" };
    }
  };

  const imageFinal = data?.user?.profilePictureUrl
    ? DOC_URL + data?.user?.profilePictureUrl
    : data?.user?.gender === "MALE"
    ? MaleProfile
    : data?.user?.gender === "FEMALE"
    ? FemaleProfile
    : null;

  const avatarSize = isSmallScreen ? 80 : isMediumScreen ? 90 : 100;
  const { icon, color } = getIconAndColor(league);
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
          <div style={{ position: "relative" }}>
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
            <div style={{ position: "absolute", top: -20 }}>
              <Avatar
                style={{
                  backgroundColor: color,
                  width: 46,
                  height: 46,
                  color: "#fff",
                }}
              >
                {icon}
              </Avatar>
            </div>
          </div>
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
            <div>
              <IconButton
                sx={{ color: theme.palette.primary.main }}
                onClick={() => {
                  setIsEditModalOpen(true);
                  setRowData(data);
                }}
              >
                <EditRoundedIcon />
              </IconButton>
              {/* <IconButton
                onClick={() => {
                  setIsDocumentModalOpen(true);
                  setRowData(data);
                }}
              >
                <UploadFileRoundedIcon />
              </IconButton> */}
            </div>
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
                {data?.user?.email || "No Email Provided"}
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

export default CustomerCardView;
