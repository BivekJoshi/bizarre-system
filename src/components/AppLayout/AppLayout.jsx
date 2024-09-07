import {
  Box,
  Drawer,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import LoggedNavbar from "../Navbar/LoggedNavbar";
import SideBar from "../SideBar/SideBar";

const AppLayout = () => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleOpenDrawer = () => setOpenDrawer(true);
  const handleCloseDrawer = () => setOpenDrawer(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <LoggedNavbar handleOpenDrawer={handleOpenDrawer} />
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        {!isMdScreen && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: theme.palette.background.default,
              width: "298px",
              boxSizing: "border-box",
            }}
          >
            <Grid container alignItems="center" sx={{padding:"1rem" }}>
              <Typography variant="h6">Welcome</Typography>
            </Grid>
            <SideBar handleCloseDrawer={handleCloseDrawer} />
          </Box>
        )}

        <Box
          sx={{
            flexGrow: 1,
            width: isMdScreen ? "100%" : `calc(100% - 298px)`,
            padding: isMdScreen ? "1rem" : "2rem",
            boxSizing: "border-box",
          }}
        >
          <Outlet />
        </Box>

        <Drawer
          open={openDrawer}
          anchor="left"
          onClose={handleCloseDrawer}
          PaperProps={{
            sx: { width: "320px", padding: "1rem" },
          }}
        >
          <Grid
            container
            alignItems="center"
            sx={{ gap: "0.6rem", marginBottom: "1rem" }}
          >
            <Typography variant="h6">Welcome</Typography>
          </Grid>
          <SideBar handleCloseDrawer={handleCloseDrawer} />
        </Drawer>
      </Box>
    </Box>
  );
};

export default AppLayout;
