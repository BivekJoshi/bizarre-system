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
    <Box sx={{ display: "flex", height: "100dvh" }}>
      {/* --- DESKTOP SIDEBAR --- */}
      {!isMobile && (
        <Box
          component="aside"
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            height: "100dvh",
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
              background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Logo */}
            <Box sx={{ display: "flex", justifyContent: "center" }} p={2}>
              <Box sx={{ width: 100, height: 100 }}>
                <img
                  src={BizarreBrosLogo}
                  alt="Bizarre Bros Logo"
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Box>

            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)", mx: 2 }} />

            {/* Sidebar Content */}
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                "&::-webkit-scrollbar": { width: "4px" },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "10px",
                },
              }}
            >
              <SideBar handleCloseDrawer={handleCloseDrawer} />
            </Box>

            {/* Footer */}
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
                  textAlign: "center",
                  display: "block",
                }}
              >
                Bizarre Special
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* --- MAIN CONTENT --- */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100dvh",
          overflow: "hidden", // prevents double scroll
        }}
        pt={1}
        pr={isMobile ? 1 : 3}
        pl={1}
      >
        {/* Navbar */}
        <LoggedNavbar handleOpenDrawer={handleOpenDrawer} />

        {/* Scrollable Content */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",

            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <Box sx={{ m: "6px auto" }} pb={6}>
            <Outlet />
          </Box>
        </Box>
      </Box>

      {/* --- MOBILE DRAWER --- */}
      <Drawer
        open={openDrawer}
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: {
            width: SIDEBAR_WIDTH,
            p: 2,
            background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
          },
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