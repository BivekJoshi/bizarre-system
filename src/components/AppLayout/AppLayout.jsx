import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Outlet } from "react-router-dom";
import LoggedNavbar from "../Navbar/LoggedNavbar";
import SideBar from "../SideBar/SideBar";
import MobileBottomNav from "../SideBar/MobileBottomNav";
import BizarreBrosLogo from "../../assets/BizarreBrosLogo.png";

const SIDEBAR_WIDTH = 248;
const NAVBAR_HEIGHT = 56;
const BOTTOM_NAV_HEIGHT = 60;

const AppLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDark = theme.palette.mode === "dark";
  const [openDrawer, setOpenDrawer] = useState(false);

  const surfaceBorder = isDark ? "#262626" : "#E7E5E4";

  const sidebarShell = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          height: NAVBAR_HEIGHT,
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          px: 2,
          borderBottom: `1px solid ${surfaceBorder}`,
        }}
      >
        <Box
          component="img"
          src={BizarreBrosLogo}
          alt="logo"
          sx={{ width: 28, height: 28, objectFit: "contain" }}
        />
        <Typography
          variant="subtitle2"
          fontWeight={700}
          sx={{ letterSpacing: "-0.01em" }}
        >
          Bizarre Bros
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          py: 0.5,
        }}
      >
        <SideBar handleCloseDrawer={() => setOpenDrawer(false)} />
      </Box>

      <Box
        sx={{
          px: 2,
          py: 1.25,
          borderTop: `1px solid ${surfaceBorder}`,
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: "text.disabled", display: "block" }}
        >
          Bizarre Special
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100dvh",
        width: "100%",
        bgcolor: "background.default",
      }}
    >
      {!isMobile && (
        <Box
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            position: "sticky",
            top: 0,
            height: "100dvh",
            borderRight: `1px solid ${surfaceBorder}`,
          }}
        >
          {sidebarShell}
        </Box>
      )}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100dvh",
          width: 0,
        }}
      >
        <LoggedNavbar handleOpenDrawer={() => setOpenDrawer(true)} />

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            px: { xs: 1.5, sm: 2, md: 3 },
            py: { xs: 1.5, md: 2 },
            pb: {
              xs: `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom) + 16px)`,
              md: 4,
            },
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <Drawer
        open={openDrawer && isMobile}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            width: SIDEBAR_WIDTH,
            border: "none",
            bgcolor: "background.default",
          },
        }}
      >
        <Box
          sx={{
            height: NAVBAR_HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            borderBottom: `1px solid ${surfaceBorder}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <Box
              component="img"
              src={BizarreBrosLogo}
              alt="logo"
              sx={{ width: 26, height: 26 }}
            />
            <Typography variant="subtitle2" fontWeight={700}>
              Bizarre Bros
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setOpenDrawer(false)}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <SideBar handleCloseDrawer={() => setOpenDrawer(false)} />
        </Box>
      </Drawer>

      {isMobile && <MobileBottomNav onMore={() => setOpenDrawer(true)} />}
    </Box>
  );
};

export default AppLayout;
