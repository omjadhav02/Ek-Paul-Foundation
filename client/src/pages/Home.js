import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      {/* Later you can add AboutSection preview */}
      <Footer />
    </div>
  );
};

export default Home;
