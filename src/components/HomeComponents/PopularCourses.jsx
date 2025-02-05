import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

export default function PopularCourses() {
  const [courses, setCourses] = useState([]); // Store all courses

  useEffect(() => {
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
      <span className="text-sm text-red-500 font-semibold">
        LEARN AT YOUR OWN PACE
      </span>

      <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
        Popular <span className="mr-2"></span>
        <div className="relative inline-flex">
          <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]"></span>
          <h1 className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
            Courses
          </h1>
        </div>
      </h1>
      <p className="mt-8 text-base text-black sm:text-xl">
        Bright Horizon Institute offers students a high-quality training program
        taught b
        <br />
        experienced instructors.
      </p>

      {/* Pass the courses data to CourseCard */}
      {courses.length === 0 ? (
        <p className="text-xl font-semibold text-gray-600 mt-6">Loading...</p>
      ) : (
        <CourseCard courses={courses} />
      )}
    </section>
  );
}
