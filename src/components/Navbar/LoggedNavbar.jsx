import {
  Avatar,
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
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NepaliDate from "nepali-date";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Setting from "./Setting";
import maleProfile from "../../assets/MaleProfile.png";
import femaleProfile from "../../assets/FemaleProfile.png";
import { useGetUserData } from "../../hooks/user/useUser";
import { useDispatch } from "react-redux";
import { setUserId } from "../../redux/Slice/userIdSlice";
import { DOC_URL } from "../../api/axiosInterceptor";
import BreadCrumpCustom from "./BreadCrumpCustom";

const NAV_HEIGHT = 56;

const LoggedNavbar = ({ handleOpenDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openSettingDrawer, setOpenSettingDrawer] = React.useState(false);

  const formattedDate = new Date().toLocaleDateString("en-CA");
  const formattedNepaliDate = new NepaliDate().format("YYYY-MM-DD");

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

  const lastName = (() => {
    if (!fullName) return "";
    const parts = fullName.trim().split(" ");
    return parts[parts.length - 1];
  })();

  const greeting = (() => {
    if (!lastName) return "Hello!";
    if (gender === "MALE") return `Mr. ${lastName}`;
    if (gender === "FEMALE") return `Ms. ${lastName}`;
    return fullName;
  })();

  const borderColor = isDark ? "#262626" : "#E7E5E4";
  const subtleBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 900,
        bgcolor: "background.default",
        borderBottom: `1px solid ${borderColor}`,
        backdropFilter: "saturate(140%) blur(8px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          height: NAV_HEIGHT,
          px: { xs: 1.5, sm: 2, md: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            minWidth: 0,
            flex: 1,
          }}
        >
          {isMobile && (
            <IconButton
              size="small"
              onClick={handleOpenDrawer}
              sx={{
                bgcolor: subtleBg,
                width: 36,
                height: 36,
              }}
            >
              <MenuRoundedIcon fontSize="small" />
            </IconButton>
          )}
          <Box sx={{ minWidth: 0, overflow: "hidden" }}>
            <BreadCrumpCustom />
          </Box>
        </Box>

        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              border: `1px solid ${borderColor}`,
              bgcolor: "background.paper",
            }}
          >
            <Tooltip title="Global Date">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  fontSize: 12,
                }}
              >
                <Typography component="span" sx={{ fontSize: 14 }}>
                  🌎
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ lineHeight: 1 }}
                >
                  {formattedDate}
                </Typography>
              </Box>
            </Tooltip>
            <Box
              sx={{ width: 1, height: 16, bgcolor: borderColor }}
            />
            <Tooltip title="Nepal Date">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  fontSize: 12,
                }}
              >
                <Typography component="span" sx={{ fontSize: 14 }}>
                  🇳🇵
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ lineHeight: 1 }}
                >
                  {formattedNepaliDate}
                </Typography>
              </Box>
            </Tooltip>
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {!isMobile && (
            <Tooltip title="Settings">
              <IconButton
                size="small"
                onClick={() => setOpenSettingDrawer(true)}
                sx={{ width: 36, height: 36 }}
              >
                <SettingsOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          <Box
            onClick={() => setOpenSettingDrawer(true)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              px: 0.75,
              py: 0.5,
              borderRadius: 1.5,
              "&:hover": { bgcolor: subtleBg },
            }}
          >
            {!isMobile && (
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ display: { xs: "none", lg: "block" } }}
              >
                {greeting}
              </Typography>
            )}
            <Avatar
              alt="profile"
              src={imageFinal}
              sx={{
                width: 30,
                height: 30,
                fontSize: 13,
                border: `1px solid ${borderColor}`,
              }}
            />
          </Box>
        </Box>

        <Drawer
          open={openSettingDrawer}
          anchor="right"
          onClose={() => setOpenSettingDrawer(false)}
          PaperProps={{
            sx: {
              width: { xs: "88%", sm: 360 },
              border: "none",
              borderLeft: `1px solid ${borderColor}`,
            },
          }}
        >
          <Setting close={() => setOpenSettingDrawer(false)} />
        </Drawer>
      </Box>
    </Box>
  );
};

export default LoggedNavbar;
