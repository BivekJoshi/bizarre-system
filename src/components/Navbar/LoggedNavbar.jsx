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
  InputBase,
  alpha,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import NepaliDate from "nepali-date";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import Setting from "./Setting";
import maleProfile from "../../assets/MaleProfile.png";
import femaleProfile from "../../assets/FemaleProfile.png";
import { useGetUserData } from "../../hooks/user/useUser";
import BizarreBrosLogo from "../../assets/BizarreBrosLogo.png";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../../redux/Slice/userIdSlice";
import { DOC_URL } from "../../api/axiosInterceptor";
import BreadCrumpCustom from "./BreadCrumpCustom";

const LoggedNavbar = ({ handleOpenDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const cart = useSelector((state) => state.cart.cart);

  const isXsScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openSettingDrawer, setOpenSettingDrawer] = React.useState(false);

  const currentDateTime = new Date();
  const formattedDateTime = currentDateTime.toLocaleDateString("en-CA");

  const currentNepaliDate = new NepaliDate();
  const formattedNepaliDate = currentNepaliDate.format("YYYY-MM-DD");

  const handleSetting = () => setOpenSettingDrawer(true);

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
        px: 2,
        py: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "60px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isXsScreen && (
            <IconButton
              size="large"
              onClick={handleOpenDrawer}
              color="inherit"
              sx={{
                bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                borderRadius: "12px",
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <BreadCrumpCustom />
        </Box>

        {!isXsScreen && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              px: 3,
              py: 0.8,
              borderRadius: "20px",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"}`,
            }}
          >
            {/* Global */}
            <Tooltip title="Global Date">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography fontSize="18px">🌎</Typography>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ display: "block", lineHeight: 1 }}
                    color="text.secondary"
                  >
                    Global
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formattedDateTime}
                  </Typography>
                </Box>
              </Box>
            </Tooltip>

            <Box sx={{ width: "1px", height: "24px", bgcolor: "divider", opacity: 0.5 }} />

            {/* Nepal */}
            <Tooltip title="Nepal Date">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography fontSize="18px">🇳🇵</Typography>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ display: "block", lineHeight: 1 }}
                    color="text.secondary"
                  >
                    Nepal
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formattedNepaliDate}
                  </Typography>
                </Box>
              </Box>
            </Tooltip>
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {!isXsScreen && (
            <>
              <Tooltip title="Setting">
                <IconButton onClick={handleSetting} sx={{ bgcolor: "transparent" }}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  cursor: "pointer",
                }}
                onClick={handleSetting}
              >
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body2" fontWeight={700} color="text.primary">
                    {greeting}
                  </Typography>
                </Box>
                <Avatar
                  alt="Profile Image"
                  src={imageFinal}
                  sx={{
                    width: 36,
                    height: 36,
                    border: `2px solid ${theme.palette.primary.main}`,
                  }}
                />
              </Box>
            </>
          )}

          {isXsScreen && (
            <IconButton onClick={handleSetting}>
              <Avatar
                alt="Profile Image"
                src={imageFinal}
                sx={{
                  width: 40,
                  height: 40,
                  border: `2px solid ${theme.palette.primary.main}`,
                }}
              />
            </IconButton>
          )}
        </Box>

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
