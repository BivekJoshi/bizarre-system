import React from "react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import MenuSection from "../sections/MenuSection";
import BizarreCoin from "../sections/BizarreCoin";
import Franchise from "../sections/Franchise";
import JoinUs from "../sections/JoinUs";
import Contact from "../sections/Contact";

const Home = () => (
  <>
    <Hero />
    <About />
    <MenuSection compact />
    <BizarreCoin />
    <Franchise />
    <JoinUs />
    <Contact />
  </>
);

export default Home;
