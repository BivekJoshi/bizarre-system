import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const SectionTitle = ({ eyebrow, title, subtitle, align = "left" }) => (
  <Box sx={{ textAlign: align, mb: 6 }}>
    {eyebrow && <span className="cb-eyebrow">{eyebrow}</span>}
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <Typography
        component="h2"
        className="cb-section-title"
        sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, lineHeight: 1.1, fontWeight: 800 }}
      >
        {title}
      </Typography>
    </motion.div>
    {subtitle && (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Typography
          sx={{ mt: 3, maxWidth: 680, opacity: 0.78, fontSize: "1.05rem", lineHeight: 1.7 }}
        >
          {subtitle}
        </Typography>
      </motion.div>
    )}
  </Box>
);

export default SectionTitle;
