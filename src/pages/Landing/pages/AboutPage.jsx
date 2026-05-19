import React from "react";
import { Box } from "@mui/material";
import About from "../sections/About";
import BizarreCoin from "../sections/BizarreCoin";

const AboutPage = () => (
  <Box sx={{ pt: { xs: 4, md: 6 } }}>
    <About />
    <BizarreCoin />
  </Box>
);

export default AboutPage;
