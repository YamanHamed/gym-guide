import React from "react";
import Hero from "../components/Hero";
import BentoGrid from "../components/BentoGrid";
import FeedBackSec from "../components/FeedBackSec";
import AboutSec from "../components/AboutSec";

const Home = () => {
  return (
    <>
      <Hero />
      <BentoGrid />
      <AboutSec />
      <FeedBackSec />
    </>
  );
};

export default Home;
