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
  const isXsScreen = useMediaQuery((theme) =>
    theme.breakpoints.down("md", "sm")
  );

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleOpenDrawer = () => setOpenDrawer(true);
  const handleCloseDrawer = () => setOpenDrawer(false);

  return (
    <div>
      <LoggedNavbar handleOpenDrawer={handleOpenDrawer} />
      <Box>
        <Box
          sx={{
            minHeight: "90vh",
            padding: ".1rem 0 0 0",
            display: "flex",
            width: "100%",
          }}
        >
          {!isXsScreen && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: theme.palette.background.default,
                maxHeight: "92vh",
                width: "298px",
                // overflowY:"scroll"
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "1rem",
                  gap: "0.6rem",
                }}
              >
                {/* <img width={40} src={userProfile} alt="admin-logo" /> */}
                <Typography variant="h6" sx={{ padding: "1rem" }}>
                  Welcome
                </Typography>
              </Grid>
              <Grid>
                <SideBar handleCloseDrawer={handleCloseDrawer} />
              </Grid>
            </Box>
          )}
          <Box
            sx={{
              flexGrow: 1,
              width: isXsScreen ? "100%" : "calc(100% - 298px)",
              padding: "2rem",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>

      {isXsScreen && (
        <Drawer
          open={openDrawer}
          anchor={"left"}
          onClose={() => setOpenDrawer(false)}
          PaperProps={{
            sx: { width: "320px" },
          }}
        >
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              margin: "1rem 2rem",
            }}
          >
            {/* <img width={40} src={userProfile} alt="admin-logo" /> */}
            <Typography variant="h6">Welcome</Typography>
          </Grid>
          <SideBar handleCloseDrawer={handleCloseDrawer} />
        </Drawer>
      )}
    </div>
  );
};

export default AppLayout;
