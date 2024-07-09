import React from "react";
import Hero from "../components/Hero";
import FeaturesSection from "../components/FeaturesSection";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-100 bg-opacity-50">
     <Hero/>
     <FeaturesSection/>
    </div>
  );
};

export default LandingPage;
