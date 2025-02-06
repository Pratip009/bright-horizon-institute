import { useState, useEffect } from "react";
import CourseCard from "../../components/HomeComponents/CourseCard";
import Banner from "../../components/Banner";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Example of fetching the courses from a JSON file or an API
    fetch("/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  return (
    <div className="container mt-5">
      <div className="" style={{ marginTop: "7rem" }}>
        <Banner
          text="Courses"
          imageUrl="https://www.commonsense.org/sites/default/files/png/2020-12/teachers-essential-guide-to-coding-in-the-classroom-article.png"
        />
      </div>
      <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
      <CourseCard courses={courses} />
      </section>
    
    </div>
  );
};

export default Courses;
