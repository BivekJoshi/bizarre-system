import React, { useState } from "react";
import { Box, Container, Grid, Typography, Snackbar } from "@mui/material";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { CONTACT, SOCIALS } from "../siteContent";

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid var(--cb-line)",
  background: "var(--cb-input-bg)",
  color: "var(--cb-text)",
  outline: "none",
  fontFamily: "inherit",
  fontSize: ".95rem",
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [open, setOpen] = useState(false);

  const handle = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    setOpen(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Box id="contact" className="cb-section">
      <Container maxWidth="xl">
        <SectionTitle
          eyebrow="Contact"
          title="Let's get in touch."
          subtitle="Tell us what's on your mind — feedback, an event, a question about the menu, or just to say hi."
          align="center"
        />

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <Box className="cb-card" sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.5, height: "100%" }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <MailRoundedIcon sx={{ color: "var(--cb-rose)" }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>Email</Typography>
                    <a href={CONTACT.emailHref} style={{ color: "inherit", textDecoration: "none", opacity: 0.8 }}>
                      {CONTACT.email}
                    </a>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <LocationOnRoundedIcon sx={{ color: "var(--cb-rose)" }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>Location</Typography>
                    <Typography sx={{ opacity: 0.8 }}>{CONTACT.city}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <AccessTimeRoundedIcon sx={{ color: "var(--cb-rose)" }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>Hours</Typography>
                    <Typography sx={{ opacity: 0.8 }}>{CONTACT.hours}</Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Typography sx={{ fontSize: ".78rem", letterSpacing: ".2em", textTransform: "uppercase", opacity: 0.7, mb: 1 }}>
                    Follow
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {SOCIALS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cb-chip"
                      >
                        {s.label}
                      </a>
                    ))}
                  </Box>
                </Box>

                <Box sx={{ mt: 1 }}>
                  <ImagePlaceholder label="Map" aspect="16 / 9" />
                </Box>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={7}>
            <motion.form
              onSubmit={submit}
              className="cb-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ padding: 24, display: "grid", gap: 16 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <input
                    required value={form.name} onChange={handle("name")}
                    placeholder="Full name"
                    style={inputStyle}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <input
                    required type="email" value={form.email} onChange={handle("email")}
                    placeholder="Email"
                    style={inputStyle}
                  />
                </Grid>
              </Grid>
              <select
                required value={form.subject} onChange={handle("subject")}
                style={inputStyle}
              >
                <option value="">I'd love to chat with you about…</option>
                <option value="feedback">Feedback</option>
                <option value="event">Event / Catering</option>
                <option value="franchise">Franchise</option>
                <option value="press">Press</option>
                <option value="other">Other</option>
              </select>
              <textarea
                required rows={6}
                value={form.message} onChange={handle("message")}
                placeholder="Your message"
                style={{ ...inputStyle, resize: "vertical" }}
              />
              <Box>
                <button className="cb-btn" type="submit">
                  <SendRoundedIcon fontSize="small" /> Send message
                </button>
              </Box>
            </motion.form>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={open}
        autoHideDuration={3500}
        onClose={() => setOpen(false)}
        message="Sending mail… we'll get back to you shortly."
      />
    </Box>
  );
};

export default Contact;
