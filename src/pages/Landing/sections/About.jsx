import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { ABOUT } from "../siteContent";

const About = () => (
  <Box id="about" className="cb-section">
    <Container maxWidth="xl">
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ position: "relative" }}>
              <ImagePlaceholder label="Café Interior" aspect="5 / 6" />
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                style={{
                  position: "absolute",
                  bottom: -22,
                  right: -22,
                  width: "60%",
                }}
              >
                <Box className="cb-card" sx={{ p: 2 }}>
                  <ImagePlaceholder label="Roastery" aspect="4 / 3" />
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <SectionTitle eyebrow="About us" title={ABOUT.heading} subtitle={ABOUT.intro} />

          <Grid container spacing={3} sx={{ mt: 1 }}>
            {ABOUT.pillars.map((p, i) => (
              <Grid item xs={12} sm={4} key={p.title}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                >
                  <Box className="cb-card" sx={{ p: 2.5, height: "100%" }}>
                    <Box
                      sx={{
                        width: 36, height: 36, borderRadius: "10px",
                        background: "var(--cb-gold)", color: "var(--cb-bean)",
                        display: "grid", placeItems: "center", fontWeight: 800, mb: 1.5,
                      }}
                    >
                      0{i + 1}
                    </Box>
                    <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{p.title}</Typography>
                    <Typography sx={{ opacity: 0.78, fontSize: ".92rem", lineHeight: 1.6 }}>{p.body}</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default About;
