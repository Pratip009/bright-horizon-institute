// src/components/Home.js

import BlogSection from "../../components/HomeComponents/BlogSection";
import BusinessInitiatives from "../../components/HomeComponents/BusinessInitiative";
import CertificationBanner from "../../components/HomeComponents/CertificationBanner";
// import CourseCard from "../../components/HomeComponents/CourseCard";
import FeaturesSection from "../../components/HomeComponents/FeaturesSection";
import FlexibleStudySection from "../../components/HomeComponents/FlexibleStudySection";
import FloatingButtons from "../../components/HomeComponents/FloatingButtons";

import HeroSection from "../../components/HomeComponents/HeroSection";
import PopularCourses from "../../components/HomeComponents/PopularCourses";

const Home = () => {
  return (
    <div className="Container-fluid space-y-4 overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <BlogSection />
      <BusinessInitiatives />
      {/* <CourseCard/> */}
      <PopularCourses />
      <FlexibleStudySection />
      <CertificationBanner />
      <FloatingButtons />
    </div>
  );
};

export default Home;
