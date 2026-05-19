import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Marquee from "./components/Marquee";
import { BRAND } from "./siteContent";
import "./landing.css";

const marqueeItems = [
  "Single-origin beans",
  "Hand-pulled espresso",
  "Bakery made fresh daily",
  "Brewed in Kathmandu",
  BRAND.microTag,
  "Bizarre Coin rewards inside",
];

const LandingLayout = () => {
  const location = useLocation();
  const mode = useSelector((s) => s.themeMode.mode);

  return (
    <div className={`cb-landing ${mode === "dark" ? "dark" : ""}`}>
      <div className="cb-ambient" aria-hidden="true" />
      <Navbar />
      <Marquee items={marqueeItems} />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default LandingLayout;
