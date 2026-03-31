import {
  Avatar,
  Badge,
  Box,
  Drawer,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import NepaliDate from "nepali-date";
import SettingsIcon from "@mui/icons-material/Settings";
import Setting from "./Setting";
import maleProfile from "../../assets/MaleProfile.png";
import femaleProfile from "../../assets/FemaleProfile.png";
import { useGetUserData } from "../../hooks/user/useUser";
import BizarreBrosLogo from "../../assets/BizarreBrosLogo.png";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../../redux/Slice/userIdSlice";
import { DOC_URL } from "../../api/axiosInterceptor";
import NotificationMenu from "../Menu/NotificationMenu";
import BreadCrumpCustom from "./BreadCrumpCustom";

const LoggedNavbar = ({ handleOpenDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const cart = useSelector((state) => state.cart.cart);

  const isXsScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openSettingDrawer, setOpenSettingDrawer] = React.useState(false);

  const currentDateTime = new Date();
  const formattedDateTime = currentDateTime.toLocaleDateString("en-CA");

  const currentNepaliDate = new NepaliDate();
  const formattedNepaliDate = currentNepaliDate.format("YYYY-MM-DD");

  const handleSetting = () => setOpenSettingDrawer(true);

  const handleCartClick = () => {
    navigate("cart");
  };

  const { data: loggedInUserData } = useGetUserData();

  const imageFinal = loggedInUserData?.data?.profilePictureUrl
    ? DOC_URL + loggedInUserData?.data?.profilePictureUrl
    : loggedInUserData?.data?.gender === "MALE"
      ? maleProfile
      : loggedInUserData?.data?.gender === "FEMALE"
        ? femaleProfile
        : null;

  useEffect(() => {
    if (loggedInUserData?.data?.id && loggedInUserData?.data?.userType) {
      dispatch(
        setUserId({
          userId: loggedInUserData?.data?.id,
          userType: loggedInUserData?.data?.userType,
        }),
      );
    }
  }, [loggedInUserData, dispatch]);

  const fullName = loggedInUserData?.data?.fullName;
  const gender = loggedInUserData?.data?.gender;

  const getLastName = (fullName) => {
    if (!fullName) return "";
    const nameParts = fullName.trim().split(" ");
    return nameParts[nameParts.length - 1];
  };

  const lastName = getLastName(fullName);

  const greetUser = (gender, lastName) => {
    if (!lastName) return "Hello!";
    if (gender === "MALE") {
      return `Hello, Mr. ${lastName}`;
    } else if (gender === "FEMALE") {
      return `Hello, Miss ${lastName}`;
    } else {
      return `Hello, ${fullName}`;
    }
  };

  const greeting = greetUser(gender, lastName);

  return (
    <Box
      sx={{
        zIndex: 900,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "50px",
        }}
      >
        {isXsScreen && (
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenDrawer}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        )}

        <BreadCrumpCustom />

        {!isXsScreen && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            {/* Global */}
            <Tooltip title="Global Date">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "default",
                  transition: "0.2s",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              >
                <Typography fontSize="18px">🌎</Typography>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{ display: "block", lineHeight: 1 }}
                    color="text.secondary"
                  >
                    Global
                  </Typography>

                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ letterSpacing: "0.3px" }}
                  >
                    {formattedDateTime}
                  </Typography>
                </Box>
              </Box>
            </Tooltip>

            {/* Divider line */}
            <Box
              sx={{
                width: "1px",
                height: "28px",
                backgroundColor: "divider",
                opacity: 0.5,
              }}
            />

            {/* Nepal */}
            <Tooltip title="Nepal Date">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "default",
                  transition: "0.2s",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              >
                <Typography fontSize="18px">🇳🇵</Typography>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{ display: "block", lineHeight: 1 }}
                    color="text.secondary"
                  >
                    Nepal
                  </Typography>

                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ letterSpacing: "0.3px" }}
                  >
                    {formattedNepaliDate}
                  </Typography>
                </Box>
              </Box>
            </Tooltip>
          </Box>
        )}

        {!isXsScreen && (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            {/* <Tooltip title="Cart">
              <IconButton onClick={handleCartClick}>
                <Badge badgeContent={cart.length} color="primary">
                  <ShoppingCartRoundedIcon />
                </Badge>
              </IconButton>
            </Tooltip> */}

            {/* <NotificationMenu /> */}

            <Tooltip title="Setting">
              <IconButton onClick={handleSetting}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Typography variant="body1">{greeting}</Typography>
              <Avatar alt="Profile Image" src={imageFinal} />
            </Box>
          </Box>
        )}

        {isXsScreen && (
          <IconButton onClick={handleSetting}>
            <Avatar alt="Profile Image" src={maleProfile} />
          </IconButton>
        )}

        <Drawer
          open={openSettingDrawer}
          anchor={"right"}
          onClose={() => setOpenSettingDrawer(false)}
          PaperProps={{
            sx: { width: "320px", borderRadius: "16px 0 0 16px" },
          }}
        >
          <Setting close={() => setOpenSettingDrawer(false)} />
        </Drawer>
      </Box>
    </Box>
  );
};

export default LoggedNavbar;
