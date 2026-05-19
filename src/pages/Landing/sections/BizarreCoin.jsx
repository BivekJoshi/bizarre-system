import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import { COIN } from "../siteContent";

const flow = [
  { step: "01", title: "Order anything", body: "Coffee, croissant, combo — every order earns coins." },
  { step: "02", title: "Earn Bizarre Coins", body: "Coins land in your account the moment your bill is closed." },
  { step: "03", title: "Climb tiers", body: "Bronze → Silver → Gold. Each tier unlocks better perks." },
  { step: "04", title: "Redeem", body: "Swap coins for drinks, treats and exclusive items." },
];

const BizarreCoin = () => (
  <Box
    id="bizarre-coin"
    className="cb-section"
    sx={{ background: "rgba(184, 131, 50, 0.05)" }}
  >
    <Container maxWidth="xl">
      <SectionTitle
        eyebrow="Loyalty"
        title={COIN.heading}
        subtitle={COIN.intro}
        align="center"
      />

      <Grid container spacing={3} sx={{ mb: 8 }}>
        {flow.map((f, i) => (
          <Grid item xs={12} sm={6} md={3} key={f.step}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.12 }}
            >
              <Box className="cb-card" sx={{ p: 3, height: "100%", textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: "2.2rem",
                    fontWeight: 900,
                    color: "var(--cb-gold)",
                    lineHeight: 1,
                    mb: 1,
                  }}
                >
                  {f.step}
                </Typography>
                <Typography sx={{ fontWeight: 700, mb: 1 }}>{f.title}</Typography>
                <Typography sx={{ opacity: 0.72, fontSize: ".9rem", lineHeight: 1.6 }}>{f.body}</Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {COIN.tiers.map((t, i) => (
          <Grid item xs={12} md={4} key={t.name}>
            <motion.div
              initial={{ opacity: 0, rotateY: -25, y: 20 }}
              whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.18, duration: 0.7 }}
              whileHover={{ y: -8 }}
            >
              <Box
                className="cb-card"
                sx={{
                  p: 4,
                  height: "100%",
                  textAlign: "center",
                  borderTop: `4px solid ${t.color}`,
                }}
              >
                <Box className="cb-tier-ring" style={{ "--ring-color": t.color }}>
                  <div className="cb-tier-ring__inner" style={{ background: t.color }}>
                    {t.name[0]}
                  </div>
                </Box>
                <Typography sx={{ fontWeight: 800, fontSize: "1.4rem", letterSpacing: ".05em", mb: 2 }}>
                  {t.name}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2, alignItems: "flex-start" }}>
                  {t.perks.map((p) => (
                    <Box key={p} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                      <CheckCircleRoundedIcon sx={{ color: t.color, fontSize: 18, mt: "2px" }} />
                      <Typography sx={{ fontSize: ".92rem", lineHeight: 1.5, opacity: 0.85 }}>{p}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default BizarreCoin;
