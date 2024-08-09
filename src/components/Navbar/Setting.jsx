import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { toogleDarkMode } from "../../redux/Slice/darkModeSlice";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import ViewModuleRoundedIcon from "@mui/icons-material/ViewModuleRounded";
import TocRoundedIcon from "@mui/icons-material/TocRounded";
import { toogleViewMode } from "../../redux/Slice/gridModeSlice";

const Setting = ({ close }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleModeChange = (selectedMode) => {
    dispatch(toogleDarkMode(selectedMode));
  };

  const handleViewChange = (selectedView) => {
    dispatch(toogleViewMode(selectedView));
  };

  const mode = localStorage.getItem("themeMode");
  const mode2 = localStorage.getItem("view");

  return (
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
            variant={mode === "light" ? "contained" : "outlined"}
            onClick={() => handleModeChange("light")}
            startIcon={<DarkModeRoundedIcon />}
          >
            Light
          </Button>
          <Button
            variant={mode === "dark" ? "contained" : "outlined"}
            onClick={() => handleModeChange("dark")}
            startIcon={<WbSunnyRoundedIcon />}
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
        <ButtonGroup
          variant="outlined"
          fullWidth
        >
          <Button
            variant={mode2 === "grid" ? "contained" : "outlined"}
            onClick={() => handleViewChange("grid")}
            startIcon={<ViewModuleRoundedIcon />}
          >
            Grid
          </Button>
          <Button
            variant={mode2 === "table" ? "contained" : "outlined"}
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
        <Button variant="outlined">Profile</Button>
        <br />
        <Button variant="outlined">Change Password</Button>
        <br />
        <Button variant="outlined">Logout</Button>
      </Box>
    </Box>
  );
};

export default Setting;
