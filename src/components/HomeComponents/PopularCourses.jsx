import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CourseCard from "./CourseCard";

export default function PopularCourses() {
  const [courses, setCourses] = useState([]); // Store all courses

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out",
      once: true, // Animation occurs only once
    });

    const fetchCourses = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data); // Set courses data
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourses();
  }, []); // Empty array ensures this runs only once

  return (
    <section className="text-center py-16">
      <span 
        className="text-sm text-red-500 font-semibold"
        data-aos="fade-up"
      >
        LEARN AT YOUR OWN PACE
      </span>

      <h1 
        className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl"
        data-aos="fade-up" 
        data-aos-delay="200"
      >
        Popular <span className="mr-2"></span>
        <div className="relative inline-flex">
          <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]"></span>
          <h1 className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
            Courses
          </h1>
        </div>
      </h1>
      
      <p 
        className="mt-8 text-base text-black sm:text-xl"
        data-aos="fade-up" 
        data-aos-delay="400"
      >
        Bright Horizon Institute offers students a high-quality training program
        taught by <br /> experienced instructors.
      </p>

      {/* Course Cards with AOS effect */}
      <div data-aos="fade-up" data-aos-delay="600">
        {courses.length === 0 ? (
          <p className="text-xl font-semibold text-gray-600 mt-6">Loading...</p>
        ) : (
          <CourseCard courses={courses} />
        )}
      </div>
    </section>
  );
}
