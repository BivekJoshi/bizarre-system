import {
  Avatar,
  Badge,
  Box,
  Drawer,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import NepaliDate from "nepali-date";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";

const LoggedNavbar = ({ handleOpenDrawer }) => {
  const navigate = useNavigate();
  const isXsScreen = useMediaQuery((theme) =>
    theme.breakpoints.down("md", "sm")
  );
  const [openSettingDrawer, setOpenSettingDrawer] = React.useState(false);

  const currentDateTime = new Date();
  const formattedDateTime = currentDateTime.toLocaleDateString("en-CA");

  const currentNepaliDate = new NepaliDate();
  const formattedNepaliDate = currentNepaliDate.format("YYYY-MM-DD");

  const handleLogout = () => {
    navigate("/");
    // logout();
  };

  const handleSetting = () => setOpenSettingDrawer(true);

  return (
    <Box sx={{ background: "#ffff" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "70px",
          padding: "0 2rem",
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

        <div style={{ width: "120px" }}>
          <img
            // src={GlobeFlag}
            alt="Bizaree Logo"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        {!isXsScreen && (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Tooltip title="Global Date">
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <Typography variant="h3">🌎</Typography>
                <Typography variant="p">{formattedDateTime}</Typography>
              </div>
            </Tooltip>

            <Tooltip title="Nepal Date">
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <Typography variant="h3">🇳🇵</Typography>
                <Typography variant="p">{formattedNepaliDate}</Typography>
              </div>
            </Tooltip>
          </div>
        )}

        {!isXsScreen && (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Typography variant="body1">Admin</Typography>
            </Box>
            <Tooltip title="Logout">
              <IconButton onClick={handleLogout}>
                <Badge badgeContent={4} color="primary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Change Mode">
              <IconButton onClick={handleSetting}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {isXsScreen && (
          <IconButton onClick={handleSetting}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </IconButton>
        )}
        <Drawer
          open={openSettingDrawer}
          anchor={"right"}
          onClose={() => setOpenSettingDrawer(false)}
          PaperProps={{
            sx: { width: "320px", borderRadius: "16px 0 0 16px" },
          }}
        ></Drawer>
      </Box>
    </Box>
  );
};

export default LoggedNavbar;
