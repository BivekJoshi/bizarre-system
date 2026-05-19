import React, { useState } from "react";
import { Box, Container, Grid, Typography, Snackbar } from "@mui/material";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { JOIN_FORM_FIELDS } from "../siteContent";

const baseInput = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 12,
  border: "1px solid var(--cb-line)",
  background: "var(--cb-input-bg)",
  color: "var(--cb-text)",
  outline: "none",
  fontFamily: "inherit",
  fontSize: ".95rem",
};

const JoinUs = () => {
  const [form, setForm] = useState({});
  const [open, setOpen] = useState(false);

  const handle = (name) => (e) => setForm((s) => ({ ...s, [name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    setOpen(true);
    setForm({});
  };

  return (
    <Box
      id="join-us"
      className="cb-section"
      sx={{ background: "rgba(184, 92, 92, 0.05)" }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <ImagePlaceholder label="The Team" aspect="4 / 5" />
            </motion.div>
          </Grid>

          <Grid item xs={12} md={7}>
            <SectionTitle
              eyebrow="Work with us"
              title="Join the Bizarre crew."
              subtitle="We're always on the lookout for baristas, cooks, hosts and humans who care. Drop your details and we'll reach out."
            />

            <Box
              component="form"
              onSubmit={submit}
              className="cb-card"
              sx={{ p: 3, display: "grid", gap: 2 }}
            >
              <Grid container spacing={2}>
                {JOIN_FORM_FIELDS.map((f, i) => (
                  <Grid
                    key={f.name}
                    item
                    xs={12}
                    sm={f.type === "textarea" ? 12 : 6}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <label style={{ fontSize: ".8rem", letterSpacing: ".08em", textTransform: "uppercase", opacity: 0.7 }}>
                        {f.label}
                      </label>
                      {f.type === "select" ? (
                        <select
                          required={f.required}
                          value={form[f.name] || ""}
                          onChange={handle(f.name)}
                          style={{ ...baseInput, marginTop: 6 }}
                        >
                          <option value="">Select…</option>
                          {f.options.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      ) : f.type === "textarea" ? (
                        <textarea
                          required={f.required}
                          rows={4}
                          value={form[f.name] || ""}
                          onChange={handle(f.name)}
                          style={{ ...baseInput, marginTop: 6, resize: "vertical" }}
                        />
                      ) : (
                        <input
                          type={f.type}
                          required={f.required}
                          value={form[f.name] || ""}
                          onChange={handle(f.name)}
                          style={{ ...baseInput, marginTop: 6 }}
                        />
                      )}
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
                <button className="cb-btn" type="submit">
                  <WorkOutlineRoundedIcon fontSize="small" /> Apply now
                </button>
                <Typography sx={{ opacity: 0.7, fontSize: ".85rem" }}>
                  We'll never spam you. Promise.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={open}
        autoHideDuration={3500}
        onClose={() => setOpen(false)}
        message="Joined Successfully! We'll reach out soon."
      />
    </Box>
  );
};

export default JoinUs;
