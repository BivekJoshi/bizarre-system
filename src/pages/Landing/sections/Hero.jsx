import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BRAND } from "../siteContent";
import BeanRain from "../components/BeanRain";
import NeonSkull from "../components/NeonSkull";

const wordVariant = {
  hidden: { opacity: 0, y: 26, rotateX: -30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: i * 0.06, duration: 0.65, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

const Hero = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const yMove = useTransform(scrollY, [0, 600], [0, 110]);
  const cupRotate = useTransform(scrollY, [0, 600], [0, 24]);
  const mode = useSelector((s) => s.themeMode.mode);

  const headlineWords = BRAND.hero.split(" ");
  const skullTone = mode === "dark" ? "#c8a07a" : "#b88332";

  return (
    <Box
      sx={{
        position: "relative",
        pt: { xs: 6, md: 10 },
        pb: { xs: 8, md: 12 },
        overflow: "hidden",
      }}
    >
      <BeanRain count={20} />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
            >
              <span className="cb-stamp">
                <NeonSkull color={skullTone} size={22} strokeWidth={3.2} glow={false} />
                {BRAND.parent}
              </span>
            </motion.div>

            <Typography
              component="h1"
              sx={{
                mt: 3,
                fontSize: { xs: "3rem", sm: "4rem", md: "5rem", lg: "5.6rem" },
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                mb: 2.5,
              }}
            >
              <span className="cb-glitch" data-text={BRAND.name}>
                {BRAND.name}
              </span>
            </Typography>

            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.15rem", sm: "1.35rem", md: "1.6rem" },
                fontWeight: 600,
                lineHeight: 1.35,
                letterSpacing: "-0.005em",
                mb: 3,
                color: "var(--cb-muted)",
                maxWidth: 620,
                perspective: 900,
              }}
            >
              {headlineWords.map((w, i) => {
                const accent = w === "Unique" || w === "Experience,";
                return (
                  <motion.span
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="show"
                    variants={wordVariant}
                    style={{
                      display: "inline-block",
                      marginRight: "0.32rem",
                      color: accent ? "var(--cb-rose)" : undefined,
                    }}
                  >
                    {w}
                  </motion.span>
                );
              })}
            </Typography>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  maxWidth: 580,
                  color: "var(--cb-muted)",
                  lineHeight: 1.7,
                  mb: 4,
                }}
              >
                {BRAND.microTag} A Café Bizarre experience, presented by {BRAND.parent} — coffee, bakery and bites for the crew that does it different.
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                <button className="cb-btn" onClick={() => navigate("/menu")}>
                  <RestaurantMenuRoundedIcon fontSize="small" /> See the Menu
                </button>
                <button className="cb-btn cb-btn--ghost" onClick={() => navigate("/bizarre-coin")}>
                  Bizarre Coin <ArrowForwardRoundedIcon fontSize="small" />
                </button>
              </Box>

              <Box sx={{ mt: 5, display: "flex", gap: 4, flexWrap: "wrap" }}>
                {[
                  { num: "49+", label: "Beverages" },
                  { num: "32+", label: "Bakery & Bites" },
                  { num: "100%", label: "Made on Site" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.05 + i * 0.12 }}
                  >
                    <Typography sx={{ fontWeight: 800, fontSize: "1.6rem", lineHeight: 1 }}>
                      {s.num}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: ".74rem",
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        color: "var(--cb-muted)",
                      }}
                    >
                      {s.label}
                    </Typography>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={5}>
            <motion.div style={{ y: yMove }}>
              <Box sx={{ position: "relative", textAlign: "center" }}>
                <motion.div style={{ rotate: cupRotate }}>
                  <div className="cb-cup">
                    <div className="cb-steam" />
                    <div className="cb-steam" />
                    <div className="cb-steam" />
                    <div className="cb-cup__body" />
                    <div className="cb-cup__handle" />
                    <div className="cb-cup__plate" />
                  </div>
                </motion.div>

                {/* tiny skull mark — the brand's secret signature */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: -8 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 30,
                  }}
                >
                  <NeonSkull color={skullTone} size={44} strokeWidth={3} glow={false} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  style={{
                    marginTop: 10,
                    fontSize: "0.74rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "var(--cb-muted)",
                  }}
                >
                  ☕ presented by {BRAND.parent}
                </motion.div>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
