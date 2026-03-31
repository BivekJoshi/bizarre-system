import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  alpha,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { toogleDarkMode } from "../../redux/Slice/darkModeSlice";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import ViewModuleRoundedIcon from "@mui/icons-material/ViewModuleRounded";
import TocRoundedIcon from "@mui/icons-material/TocRounded";
import { toogleViewMode } from "../../redux/Slice/gridModeSlice";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import ConfirmationModal from "../Modal/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/auth/useAuth";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import DisplaySettingsOutlinedIcon from "@mui/icons-material/DisplaySettingsOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import { getUserType } from "../../utils/cookieHelper";

const Setting = ({ close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const userType = getUserType();
  const isAdmin = userType === "ADMIN";
  const isDark = theme.palette.mode === "dark";
  const [settings, setSettings] = useState({ mode: "light", view: "grid" });
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const { mutate: logout } = useLogout();

  useEffect(() => {
    const mode = localStorage.getItem("themeMode") || "light";
    const view = localStorage.getItem("view") || "grid";
    setSettings({ mode, view });
  }, []);

  const handleModeChange = (selectedMode) => {
    dispatch(toogleDarkMode(selectedMode));
    setSettings((prev) => ({ ...prev, mode: selectedMode }));
  };

  const handleViewChange = (selectedView) => {
    dispatch(toogleViewMode(selectedView));
    setSettings((prev) => ({ ...prev, view: selectedView }));
  };

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/");
    close();
  };

  const sectionHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    mb: 2,
    mt: 3,
    color: theme.palette.primary.main,
  };

  const cardStyle = {
    p: 2,
    borderRadius: "16px",
    background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}`,
    mb: 3,
  };

  return (
    <>
      <Box sx={{ p: 3, height: "100%", overflowY: "auto" }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" fontWeight={800}>
            Settings
          </Typography>
          <IconButton onClick={close} sx={{ bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ opacity: 0.5 }} />

        {/* Appearance Section */}
        <Box sx={sectionHeaderStyle}>
          <PaletteOutlinedIcon fontSize="small" />
          <Typography variant="subtitle2" fontWeight={700} sx={{ textTransform: "uppercase", letterSpacing: "1px" }}>
            Appearance
          </Typography>
        </Box>

        <Paper elevation={0} sx={cardStyle}>
          <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5, display: "block" }}>
            Theme Mode
          </Typography>
          <ButtonGroup fullWidth sx={{ borderRadius: "12px", overflow: "hidden" }}>
            <Button
              variant={settings.mode === "light" ? "contained" : "outlined"}
              onClick={() => handleModeChange("light")}
              startIcon={<WbSunnyRoundedIcon />}
              sx={{ py: 1 }}
            >
              Light
            </Button>
            <Button
              variant={settings.mode === "dark" ? "contained" : "outlined"}
              onClick={() => handleModeChange("dark")}
              startIcon={<DarkModeRoundedIcon />}
              sx={{ py: 1 }}
            >
              Dark
            </Button>
          </ButtonGroup>
        </Paper>

        {/* Display Section */}
        <Box sx={sectionHeaderStyle}>
          <DisplaySettingsOutlinedIcon fontSize="small" />
          <Typography variant="subtitle2" fontWeight={700} sx={{ textTransform: "uppercase", letterSpacing: "1px" }}>
            Display
          </Typography>
        </Box>

        <Paper elevation={0} sx={cardStyle}>
          <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5, display: "block" }}>
            Content View
          </Typography>
          <ButtonGroup fullWidth sx={{ borderRadius: "12px", overflow: "hidden" }}>
            <Button
              variant={settings.view === "grid" ? "contained" : "outlined"}
              onClick={() => handleViewChange("grid")}
              startIcon={<ViewModuleRoundedIcon />}
              sx={{ py: 1 }}
            >
              Grid
            </Button>
            <Button
              variant={settings.view === "table" ? "contained" : "outlined"}
              onClick={() => handleViewChange("table")}
              startIcon={<TocRoundedIcon />}
              sx={{ py: 1 }}
            >
              Table
            </Button>
          </ButtonGroup>
        </Paper>

        {/* Account Section */}
        <Box sx={sectionHeaderStyle}>
          <ManageAccountsOutlinedIcon fontSize="small" />
          <Typography variant="subtitle2" fontWeight={700} sx={{ textTransform: "uppercase", letterSpacing: "1px" }}>
            Account
          </Typography>
        </Box>

        <List disablePadding>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => {
                navigate("profile");
                close();
              }}
              sx={{ borderRadius: "12px", py: 1.5 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <AccountCircleRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2" fontWeight={600}>Profile Settings</Typography>}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => {
                navigate(`change-password`);
                close();
              }}
              sx={{ borderRadius: "12px", py: 1.5 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <LockResetRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2" fontWeight={600}>Change Password</Typography>}
              />
            </ListItemButton>
          </ListItem>
        </List>

        {/* System Section (Admin Only) */}
        {isAdmin && (
          <>
            <Box sx={sectionHeaderStyle}>
              <SettingsSuggestOutlinedIcon fontSize="small" />
              <Typography variant="subtitle2" fontWeight={700} sx={{ textTransform: "uppercase", letterSpacing: "1px" }}>
                System
              </Typography>
            </Box>

            <List disablePadding>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => {
                    navigate("setting");
                    close();
                  }}
                  sx={{ borderRadius: "12px", py: 1.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <SettingsSuggestOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="body2" fontWeight={600}>Global Settings</Typography>}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        )}

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            fullWidth
            color="error"
            startIcon={<LoginRoundedIcon />}
            onClick={() => setOpenLogoutModal(true)}
            sx={{
              py: 1.5,
              borderRadius: "12px",
              background: "linear-gradient(45deg, #ef4444 30%, #f87171 90%)",
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)",
              "&:hover": {
                background: "linear-gradient(45deg, #dc2626 30%, #ef4444 90%)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <ConfirmationModal
        disagreeLabel={"Yes, Confirm"}
        agreeLabel={"No, Stay Logged in."}
        alertTitle={"Alert !!!"}
        header={"Will you be logging out?"}
        confirmhead={"Are you sure ?"}
        handleModalClose={() => {
          setOpenLogoutModal(false);
          close();
        }}
        isModalOpen={openLogoutModal}
        icon={
          <LoginRoundedIcon
            sx={{
              backgroundColor: isDark ? "rgba(239, 68, 68, 0.1)" : "#FFDDDC",
              borderRadius: "50%",
              fontSize: 36,
              padding: "1rem",
              color: "#ef4444",
            }}
          />
        }
        handleSave={handleLogout}
      />
    </>
  );
};

export default Setting;
