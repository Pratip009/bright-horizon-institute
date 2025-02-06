import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import brain from "../../assets/slider/brain.png";
import earth from "../../assets/slider/earth.png";
import laptop from "../../assets/slider/laptop.png";
import verify from "../../assets/slider/verify.png";

export default function FeaturesSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation only runs once
      easing: "ease-in-out", // Easing type
    });
  }, []);

  const features = [
    {
      icon: brain,
      title: "Learn the Latest Top Skills",
      description:
        "Learning top skills can bring an extraordinary outcome in a career.",
    },
    {
      icon: earth,
      title: "Learn in Your Own Pace",
      description:
        "Everyone prefers to enjoy learning at their own pace & that gives a great result.",
    },
    {
      icon: laptop,
      title: "Learn From Industry Experts",
      description:
        "Experienced teachers can assist in learning faster with their best approaches!",
    },
    {
      icon: verify,
      title: "Enjoy Learning From Anywhere",
      description:
        "We are delighted to give you options to enjoy learning from anywhere in the world.",
    },
  ];

  return (
    <section className="text-center py-16" data-aos="fade-up">
      <span className="text-sm text-red-500 font-semibold">
        EDUCATION FOR EVERYONE
      </span>

      <h1
        className="text-black font-bold text-4xl sm:text-6xl lg:text-7xl"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Affordable Online Courses and Learning <span className="mr-2"></span>
        <div className="relative inline-flex">
          <span className="absolute inset-x-0 bottom-0 border-b-[15px] sm:border-b-[20px] lg:border-b-[20px] border-[#4ADE80] "></span>
          <span className="relative font-dmserif">Opportunities</span>
        </div>
      </h1>

      <p className="mt-8 text-base text-black sm:text-xl">
        Finding your own space and utilizing better learning options can result{" "}
        <br />
        in faster learning than the traditional ways. Enjoy the beauty of
        eLearning!
      </p>

      <div
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col min-h-full"
            data-aos="flip-left"
            data-aos-delay={index * 200}
          >
            {/* Icon */}
            <img
              src={feature.icon}
              alt={feature.title}
              className="w-16 h-16 mx-auto mb-4"
              data-aos="zoom-in"
            />

            {/* Title */}
            <h4
              className="text-lg font-semibold text-gray-900"
              style={{ fontFamily: "Quicksand" }}
            >
              {feature.title}
            </h4>

            {/* Description */}
            <p
              className="text-gray-600 mt-2 flex-grow"
              style={{ fontFamily: "Nunito" }}
            >
              {feature.description}
            </p>

            {/* Button */}
            <a
              href="#"
              className="text-white font-medium mt-6 bg-[#4ADE80] px-6 py-3 rounded-full transition-all duration-300 hover:bg-[#57ad58] hover:scale-105 shadow-md inline-block"
              style={{ textDecoration: "None" }}
              data-aos="fade-up"
            >
              Start Now!
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
