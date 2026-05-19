import React, { useMemo, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { MENU_ITEMS } from "../menuData";

const CATEGORIES = [
  { key: "ALL",     label: "All" },
  { key: "BEVERAGE", label: "Beverages" },
  { key: "FOOD",     label: "Food & Bakery" },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 24, scale: 0.96 },
  show:    (i) => ({ opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.04, duration: 0.45 } }),
  exit:    { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const MenuSection = ({ compact = false }) => {
  const [filter, setFilter] = useState("ALL");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return MENU_ITEMS.filter((it) => {
      const matchesType = filter === "ALL" || it.type === filter;
      const matchesQuery = !query || it.name.toLowerCase().includes(query.toLowerCase());
      return matchesType && matchesQuery;
    });
  }, [filter, query]);

  const visible = compact ? filtered.slice(0, 8) : filtered;

  return (
    <Box id="menu" className="cb-section">
      <Container maxWidth="xl">
        <SectionTitle
          eyebrow="Menu"
          title="The Bizarre Menu"
          subtitle="From single-shot espresso to brownie sundaes — every item is dialled in by our baristas and bakers. Live data, prices in NPR."
        />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, alignItems: "center", mb: 4 }}>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`cb-chip ${filter === c.key ? "cb-chip--active" : ""}`}
              onClick={() => setFilter(c.key)}
            >
              {c.label}
            </button>
          ))}
          <Box sx={{ flex: 1, minWidth: 220 }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the menu…"
              className="cb-input"
              style={{ borderRadius: 999 }}
            />
          </Box>
          <Typography sx={{ opacity: 0.6, fontSize: ".85rem" }}>
            Showing {visible.length} of {filtered.length}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <AnimatePresence mode="popLayout">
            {visible.map((it, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={it.id}>
                <motion.div
                  layout
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  whileHover={{ y: -6 }}
                >
                  <Box className="cb-card" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <ImagePlaceholder label={it.type} aspect="5 / 4" />
                    <Box sx={{ p: 2.2, display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, alignItems: "flex-start" }}>
                        <Typography sx={{ fontWeight: 700, lineHeight: 1.25, fontSize: "1.02rem" }}>
                          {it.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 800,
                            color: "var(--cb-rose)",
                            whiteSpace: "nowrap",
                            fontSize: ".95rem",
                          }}
                        >
                          Rs. {it.price}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          opacity: 0.7,
                          fontSize: ".84rem",
                          lineHeight: 1.55,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {it.description || "—"}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 0.6, flexWrap: "wrap", mt: "auto", pt: 1 }}>
                        {it.tags
                          .split("#")
                          .filter(Boolean)
                          .slice(0, 3)
                          .map((t) => (
                            <span
                              key={t}
                              style={{
                                fontSize: ".68rem",
                                padding: "3px 10px",
                                borderRadius: 999,
                                background: "rgba(74,44,26,.08)",
                                color: "var(--cb-muted)",
                                letterSpacing: ".05em",
                              }}
                            >
                              #{t.trim()}
                            </span>
                          ))}
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

        {visible.length === 0 && (
          <Box sx={{ textAlign: "center", py: 6, opacity: 0.6 }}>No items match your filter.</Box>
        )}
      </Container>
    </Box>
  );
};

export default MenuSection;
