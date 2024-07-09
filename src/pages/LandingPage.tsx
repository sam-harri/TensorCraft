import React from "react";
import Hero from "../components/Hero";
import FeaturesSection from "../components/FeaturesSection";
import EasyAs from "../components/EasyAs";
import GetStarted from "../components/GetStarted";
import Footer from "../components/Footer";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-100 bg-opacity-50">
     <Hero/>
     <FeaturesSection/>
     <EasyAs/>
     <GetStarted/>
     <Footer/>
    </div>
  );
};

export default LandingPage;
