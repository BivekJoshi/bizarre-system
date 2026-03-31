import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Outlet } from "react-router-dom";
import LoggedNavbar from "../Navbar/LoggedNavbar";
import SideBar from "../SideBar/SideBar";
import BizarreBrosLogo from "../../assets/BizarreBrosLogo.png";

const SIDEBAR_WIDTH = 280;

const AppLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => setOpenDrawer(true);
  const handleCloseDrawer = () => setOpenDrawer(false);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* --- DESKTOP SIDEBAR (FIXED) --- */}
      {!isMobile && (
        <Box
          component="aside"
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            position: "sticky",
            top: 0,
          }}
        >
          <Box
            sx={{
              m: 1,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              borderRadius: "12px",
              overflow: "hidden",
              /* THE REFINED GRADIENT: 
         Starts at a very dark slate and drops to an almost-black charcoal. 
         No bright colors, just depth.
      */
              background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "center" }} p={2}>
              <div style={{ width: "100px", height: "100px" }}>
                <img
                  src={BizarreBrosLogo}
                  alt="Bizarre Bros Logo"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </Box>
            {/* <Box
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                minHeight: "64px",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="700"
                sx={{
                  color: "rgba(255, 255, 255, 0.9)", // Soft white, not piercing
                  fontSize: "1.1rem",
                  letterSpacing: "0.2px",
                }}
              >
                Welcome
              </Typography>
            </Box> */}

            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)", mx: 2 }} />

            {/* Navigation */}
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                py: 2,
                "&::-webkit-scrollbar": { width: "4px" },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "10px",
                },
              }}
            >
              <SideBar handleCloseDrawer={handleCloseDrawer} />
            </Box>

            {/* Subdued Footer */}
            <Box
              sx={{
                p: 2,
                mt: "auto",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.4)",
                  display: "block",
                  textAlign: "center",
                  fontWeight: 500,
                }}
              >
                Bizarre Special
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* --- MAIN CONTENT AREA --- */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
        p={1}
      >
        <LoggedNavbar handleOpenDrawer={handleOpenDrawer} />

        {/* Scrollable Content Container */}
        <Box
          sx={{
            flexGrow: 1,
            margin: "6px auto",
            height: "100%",
            overflowY: "auto",
            width:"100%",

            "&::-webkit-scrollbar": {
              display: "none",
            },

            scrollbarWidth: "none",

            msOverflowStyle: "none",
          }}
        >
          <Box sx={{ margin: "6px auto" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>

      {/* --- MOBILE DRAWER --- */}
      <Drawer
        open={openDrawer}
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: { width: SIDEBAR_WIDTH, p: 2 },
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Welcome</Typography>
          <Button onClick={handleCloseDrawer} size="small">
            <ArrowBack />
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <SideBar handleCloseDrawer={handleCloseDrawer} />
      </Drawer>
    </Box>
  );
};

export default AppLayout;
