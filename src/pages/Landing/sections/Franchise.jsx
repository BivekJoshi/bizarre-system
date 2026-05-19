import React, { useState } from "react";
import { Box, Container, Grid, Typography, Snackbar } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { FRANCHISE, CONTACT } from "../siteContent";

const Franchise = () => {
  const [form, setForm] = useState({ name: "", email: "", city: "", message: "" });
  const [open, setOpen] = useState(false);

  const handle = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    setOpen(true);
    setForm({ name: "", email: "", city: "", message: "" });
  };

  return (
    <Box id="franchise" className="cb-section">
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <SectionTitle
              eyebrow="Franchise"
              title={FRANCHISE.heading}
              subtitle={FRANCHISE.body}
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 4 }}>
              {FRANCHISE.bullets.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <CheckCircleRoundedIcon sx={{ color: "var(--cb-gold)" }} />
                  <span>{b}</span>
                </motion.div>
              ))}
            </Box>

            <Box className="cb-card" sx={{ p: 3 }}>
              <Typography sx={{ fontWeight: 700, mb: 2 }}>
                <StorefrontRoundedIcon sx={{ verticalAlign: "middle", mr: 1, color: "var(--cb-rose)" }} />
                Send us a partnership enquiry
              </Typography>
              <Box component="form" onSubmit={submit} sx={{ display: "grid", gap: 2 }}>
                <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { sm: "1fr 1fr" } }}>
                  <input
                    required value={form.name} onChange={handle("name")}
                    placeholder="Your name"
                    style={inputStyle}
                  />
                  <input
                    required type="email" value={form.email} onChange={handle("email")}
                    placeholder="Email"
                    style={inputStyle}
                  />
                </Box>
                <input
                  required value={form.city} onChange={handle("city")}
                  placeholder="Target city / area"
                  style={inputStyle}
                />
                <textarea
                  value={form.message} onChange={handle("message")}
                  placeholder="Tell us about your space, experience, timeline…"
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                />
                <Box>
                  <button className="cb-btn cb-btn--gold" type="submit">
                    Submit enquiry
                  </button>
                  <Typography sx={{ mt: 1.5, opacity: 0.65, fontSize: ".82rem" }}>
                    Or write directly to{" "}
                    <a href={CONTACT.emailHref} style={{ color: "inherit" }}>{CONTACT.email}</a>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ position: "relative" }}>
                <ImagePlaceholder label="Storefront" aspect="4 / 5" />
                <Box
                  sx={{
                    position: "absolute",
                    top: 24,
                    left: -24,
                    background: "var(--cb-bean)",
                    color: "var(--cb-foam)",
                    p: 2.5,
                    borderRadius: 3,
                    boxShadow: "0 18px 40px -20px rgba(0,0,0,.4)",
                    maxWidth: 220,
                  }}
                >
                  <Typography sx={{ fontSize: ".72rem", letterSpacing: ".25em", textTransform: "uppercase", opacity: 0.7 }}>
                    Setup time
                  </Typography>
                  <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, lineHeight: 1 }}>
                    ~60 days
                  </Typography>
                  <Typography sx={{ fontSize: ".82rem", opacity: 0.78 }}>
                    From signed deal to your first cup served.
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={open}
        autoHideDuration={3500}
        onClose={() => setOpen(false)}
        message="Thanks! We'll be in touch shortly."
      />
    </Box>
  );
};

const inputStyle = {
  padding: "11px 14px",
  borderRadius: 12,
  border: "1px solid var(--cb-line)",
  background: "var(--cb-input-bg)",
  color: "var(--cb-text)",
  outline: "none",
  fontFamily: "inherit",
  fontSize: ".95rem",
};

export default Franchise;
