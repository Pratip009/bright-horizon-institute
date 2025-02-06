// src/components/About.js

import { useEffect } from "react";
import ExpertSkills from "../../components/about/ExpertSkills";
import StatsSection from "../../components/about/StatsSection";
import Testimonials from "../../components/about/Testimonials";
import Banner from "../../components/Banner";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container mt-5">
      {" "}
      {/* Added space-y-16 for consistent vertical spacing */}
      <div className="" style={{ marginTop: "7rem" }}>
        <Banner
          text="About Us"
          imageUrl="https://www.shutterstock.com/image-photo/elementary-school-science-class-over-600nw-1795173874.jpg"
        />
      </div>
      <ExpertSkills />
      <StatsSection />
      <Testimonials />
    </div>
  );
};

export default About;
