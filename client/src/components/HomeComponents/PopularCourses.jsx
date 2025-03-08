import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CourseCard from "./CourseCard";
import SkeletonCard from "../Common/SkeletonCard"; // ✅ Import SkeletonCard

export default function PopularCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/courses`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false); // ✅ Ensure setLoading(false) always runs
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="text-center py-16">
      <span className="text-sm text-red-500 font-semibold">LEARN AT YOUR OWN PACE</span>

      <h1 className="text-black font-bold text-4xl sm:text-6xl lg:text-7xl">
        Popular <span className="mr-2"></span>
        <div className="relative inline-flex">
          <span className="absolute inset-x-0 bottom-0 border-b-[15px] sm:border-b-[20px] lg:border-b-[20px] border-[#4ADE80]"></span>
          <span className="relative font-dmserif">Courses</span>
        </div>
      </h1>

      <p className="mt-8 text-base text-black sm:text-xl">
        Bright Horizon Institute offers students a high-quality training program
        taught by experienced instructors.
      </p>

      {/* Skeleton Cards Display */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
      ) : (
        <div data-aos="fade-up" data-aos-delay="600">
          <CourseCard courses={courses} />
        </div>
      )}
    </section>
  );
}
