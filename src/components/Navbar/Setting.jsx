import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Typography,
  useTheme,
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
import { toast } from "react-toastify";

const Setting = ({ close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [settings, setSettings] = useState({ mode: "light", view: "grid" });
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

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
    localStorage.clear();
    navigate("/");
    close();
    toast.success("Logged out successful !");
  };

  return (
    <>
      <Box sx={{ padding: "1rem" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.default,
                fontWeight: 700,
                marginBottom: "0.1rem",
              }}
            >
              Setting
            </Typography>
            <IconButton onClick={close}>
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          <br />
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.default,
              fontWeight: 700,
              marginBottom: "0.1rem",
            }}
          >
            Mode
          </Typography>
          <ButtonGroup aria-label="Basic button group" fullWidth>
            <Button
              variant={settings.mode === "light" ? "contained" : "outlined"}
              onClick={() => handleModeChange("light")}
              startIcon={<WbSunnyRoundedIcon />}
            >
              Light
            </Button>
            <Button
              variant={settings.mode === "dark" ? "contained" : "outlined"}
              onClick={() => handleModeChange("dark")}
              startIcon={<DarkModeRoundedIcon />}
            >
              Dark
            </Button>
          </ButtonGroup>
          <br />

          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.default,
              fontWeight: 700,
              marginBottom: "0.1rem",
            }}
          >
            View
          </Typography>
          <ButtonGroup variant="outlined" fullWidth>
            <Button
              variant={settings.view === "grid" ? "contained" : "outlined"}
              onClick={() => handleViewChange("grid")}
              startIcon={<ViewModuleRoundedIcon />}
            >
              Grid
            </Button>
            <Button
              variant={settings.view === "table" ? "contained" : "outlined"}
              onClick={() => handleViewChange("table")}
              startIcon={<TocRoundedIcon />}
            >
              Table
            </Button>
          </ButtonGroup>
          <br />
          <Divider />
          <br />
          <br />
          <Button
            variant="outlined"
            startIcon={<AccountCircleRoundedIcon />}
            onClick={() => {
              navigate("profile");
              close();
            }}
          >
            Profile
          </Button>
          <br />
          <Button
            variant="outlined"
            startIcon={<LockResetRoundedIcon />}
            onClick={() => {
              navigate(`change-password`);
              close();
            }}
          >
            Change Password
          </Button>
          <br />
          <Button
            variant="outlined"
            startIcon={<LoginRoundedIcon />}
            color="error"
            onClick={() => {
              setOpenLogoutModal(true);
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
              backgroundColor: "#FFDDDC",
              borderRadius: "50%",
              fontSize: 36,
              padding: "1rem",
            }}
          />
        }
        handleSave={handleLogout}
      />
    </>
  );
};

export default Setting;
