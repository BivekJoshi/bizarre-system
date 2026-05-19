import React from "react";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { BRAND, CONTACT, NAV_LINKS, SOCIALS } from "../siteContent";
import NeonSkull from "./NeonSkull";

const iconMap = {
  FacebookRounded: FacebookRoundedIcon,
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
  LinkedIn: LinkedInIcon,
};

const Footer = () => (
  <Box component="footer" className="cb-footer">
    <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={5}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
              <NeonSkull color="#f3e5d2" size={30} strokeWidth={3} glow={false} />
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                {BRAND.name}
              </Typography>
            </Box>
            <Typography sx={{ opacity: 0.75, lineHeight: 1.7, maxWidth: 420 }}>
              {BRAND.hero}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
              {SOCIALS.map((s) => {
                const Icon = iconMap[s.icon];
                return (
                  <IconButton
                    key={s.label}
                    component="a"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    sx={{
                      color: "var(--cb-foam)",
                      border: "1px solid rgba(243,229,210,0.24)",
                      transition: "transform .25s, background .25s",
                      "&:hover": { background: "var(--cb-gold)", color: "var(--cb-bean)", transform: "translateY(-3px)" },
                    }}
                  >
                    {Icon ? <Icon /> : null}
                  </IconButton>
                );
              })}
            </Box>
          </motion.div>
        </Grid>

        <Grid item xs={6} md={3}>
          <Typography sx={{ fontWeight: 700, mb: 1.5, fontSize: "0.95rem", letterSpacing: ".08em", textTransform: "uppercase" }}>
            Explore
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                style={{ color: "rgba(243,229,210,.78)", textDecoration: "none" }}
              >
                {l.label}
              </NavLink>
            ))}
          </Box>
        </Grid>

        <Grid item xs={6} md={4}>
          <Typography sx={{ fontWeight: 700, mb: 1.5, fontSize: "0.95rem", letterSpacing: ".08em", textTransform: "uppercase" }}>
            Get in touch
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, opacity: 0.85 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MailRoundedIcon fontSize="small" />
              <a href={CONTACT.emailHref} style={{ color: "inherit", textDecoration: "none" }}>
                {CONTACT.email}
              </a>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnRoundedIcon fontSize="small" /> {CONTACT.city}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessTimeRoundedIcon fontSize="small" /> {CONTACT.hours}
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 6,
          pt: 3,
          borderTop: "1px solid rgba(243,229,210,0.16)",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          opacity: 0.7,
          fontSize: "0.85rem",
        }}
      >
        <span>© {new Date().getFullYear()} {BRAND.parent} All rights reserved.</span>
        <span>{BRAND.tagline}</span>
      </Box>
    </Container>
  </Box>
);

export default Footer;
