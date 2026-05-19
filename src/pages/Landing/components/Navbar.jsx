import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toogleDarkMode } from "../../../redux/Slice/darkModeSlice";
import { NAV_LINKS, BRAND } from "../siteContent";
import NeonSkull from "./NeonSkull";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.themeMode.mode);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMode = () => dispatch(toogleDarkMode(mode === "dark" ? "light" : "dark"));
  const skullColor = mode === "dark" ? "#f3e5d2" : "#2c1810";

  return (
    <Box
      component="header"
      className="cb-nav"
      sx={{
        boxShadow: scrolled ? "0 8px 24px -18px rgba(0,0,0,0.35)" : "none",
        transition: "box-shadow .3s ease",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: { xs: 1.5, md: 2 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NavLink
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Box sx={{ display: "grid", placeItems: "center" }}>
                <NeonSkull color={skullColor} size={34} strokeWidth={3} glow={false} />
              </Box>
              <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column", lineHeight: 1, ml: 0.5 }}>
                <span style={{ fontWeight: 800, fontSize: "1.05rem", letterSpacing: ".02em" }}>{BRAND.name}</span>
                <span style={{ fontSize: "0.66rem", letterSpacing: "0.24em", color: "var(--cb-muted)", textTransform: "uppercase" }}>
                  {BRAND.parent}
                </span>
              </Box>
            </NavLink>
          </motion.div>

          <Box
            component="nav"
            sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", gap: 3 }}
          >
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) => `cb-nav-link ${isActive ? "active" : ""}`}
              >
                {l.label}
              </NavLink>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={toggleMode} aria-label="toggle theme" sx={{ color: "inherit" }}>
              {mode === "dark" ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
            </IconButton>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <button className="cb-btn" onClick={() => navigate("/login")}>
                <LoginRoundedIcon fontSize="small" /> Login
              </button>
            </Box>
            <IconButton
              sx={{ display: { xs: "inline-flex", lg: "none" }, color: "inherit" }}
              onClick={() => setOpen(true)}
              aria-label="open menu"
            >
              <MenuRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            background: mode === "dark" ? "#160c08" : "var(--cb-cream)",
            color: "var(--cb-text)",
          },
        }}
      >
        <Box sx={{ width: 280, p: 3, height: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <strong>{BRAND.name}</strong>
            <IconButton onClick={() => setOpen(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          <AnimatePresence>
            <List>
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ListItemButton
                    onClick={() => {
                      setOpen(false);
                      navigate(l.to);
                    }}
                  >
                    <ListItemText primary={l.label} />
                  </ListItemButton>
                </motion.div>
              ))}
              <Box sx={{ mt: 2 }}>
                <button
                  className="cb-btn"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => {
                    setOpen(false);
                    navigate("/login");
                  }}
                >
                  <LoginRoundedIcon fontSize="small" /> Staff Login
                </button>
              </Box>
            </List>
          </AnimatePresence>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;
