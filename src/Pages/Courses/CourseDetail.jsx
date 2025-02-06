import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import { useNavigate } from "react-router-dom";
import {
  FaClock,
  FaCertificate,
  FaGraduationCap,
  FaListAlt,
} from "react-icons/fa";
const CourseDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  const handleEnroll = () => {
    navigate(`/payment/${id}`, { state: { course } }); // Pass course data to payment page
  };

  useEffect(() => {
    AOS.init(); // Initialize AOS for animations

    fetch("/courses.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedCourse = data.find(
          (course) => course.id === parseInt(id)
        );
        setCourse(selectedCourse);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
        setCourse(null); // In case of error
      });
  }, [id]);

  if (course === null) {
    return (
      <div className="text-center py-12">
        <p className="text-xl font-semibold text-gray-700">
          Loading or Course not found!
        </p>
      </div>
    );
  }

  const { CourseDuration, CourseContents } = course;
  const courseDuration = CourseDuration || {};
  const courseContents = CourseContents || [];

  return (
    <div className="container mx-auto mt-16 font-nunito">
      <Banner
        text={course.title} // Pass the course title here
        imageUrl="https://static.vecteezy.com/system/resources/thumbnails/046/946/744/small_2x/school-students-in-modern-computer-based-classroom-in-school-education-of-programming-languages-video.jpg"
      />
      <div className="flex flex-col lg:flex-row mt-8 px-4 md:px-12">
        {/* Left side: Course content with image and tabs */}
        <div className="lg:w-2/3 w-full lg:pr-12 mb-6 lg:mb-0">
          {/* Course Image */}
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-auto rounded-2xl shadow-2xl border-4 border-gray-200 hover:border-green-400 transition-all duration-300 transform "
            data-aos="fade-up"
          />

          <div>
            {/* Tab navigation */}
            <div className="flex justify-center space-x-6 border-b border-gray-300 mb-6 mt-4">
              <button
                className={`py-2 px-4 text-lg font-semibold ${
                  activeTab === "description"
                    ? "border-b-4 border-green-400 text-green-400"
                    : "text-gray-600 hover:text-green-400"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`py-2 px-4 text-lg font-semibold ${
                  activeTab === "contents"
                    ? "border-b-4 border-green-400 text-green-400"
                    : "text-gray-600 hover:text-green-400"
                }`}
                onClick={() => setActiveTab("contents")}
              >
                Course Contents
              </button>
              <button
                className={`py-2 px-4 text-lg font-semibold ${
                  activeTab === "duration"
                    ? "border-b-4 border-green-400 text-green-400"
                    : "text-gray-600 hover:text-green-400"
                }`}
                onClick={() => setActiveTab("duration")}
              >
                Course Duration
              </button>
            </div>

            {/* Tab content */}
            <div>
              {activeTab === "description" && (
                <div>
                  <p className="text-base text-black sm:text-xl">
                    {course.Description}
                  </p>
                </div>
              )}

              {activeTab === "contents" && (
                <div>
                  <ul className="list-disc pl-6 space-y-2 text-base text-black sm:text-xl">
                    {courseContents.length > 0 ? (
                      courseContents.map((content, index) => (
                        <li key={index} className="text-lg">
                          {content}
                        </li>
                      ))
                    ) : (
                      <li className="text-lg">No course contents available</li>
                    )}
                  </ul>
                </div>
              )}

              {activeTab === "duration" && (
                <div>
                  <p className="text-base text-black sm:text-xl">
                    <strong>Pre-requisite:</strong>{" "}
                    {courseDuration.preRequisites || "Not specified"}
                  </p>
                  <p className="text-base text-black sm:text-xl">
                    <strong>Total Clock Hours:</strong>{" "}
                    {courseDuration.totalClockHours || "Not specified"} Hours
                  </p>
                  <p className="text-base text-black sm:text-xl">
                    <strong>Certification:</strong>{" "}
                    {courseDuration.certification || "Not specified"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side: Sidebar */}
        <div
          className="lg:w-1/3 w-full bg-white p-6 rounded-lg shadow-lg lg:mt-0 mt-6"
          style={{ maxHeight: "fit-content" }}
          data-aos="fade-left"
        >
          <h1
            className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <span className="mr-2"></span>
            <div className="relative inline-flex">
              <h2 className="relative text-3xl font-bold text-black sm:text-4xl lg:text-5xl">
                {course.title}
              </h2>
            </div>
          </h1>
          <p className="text-2xl text-gray-700 mb-4">
            <span className="text-green-400 text-3xl font-bold">
              {course.price}
            </span>
          </p>
          <div className="text-md text-gray-700 mb-6">
            <p className="flex items-center">
              <FaClock className="mr-2 text-red-600" />
              <span className="font-semibold">
                <b>Duration:</b>{" "}
                {courseDuration.calendarLength || "Not specified"}
              </span>
            </p>

            <p className="flex items-center">
              <FaListAlt className="mr-2 text-red-600" />
              <span className="font-semibold">
                <b>Time:</b> {courseDuration.totalClockHours || "Not specified"}{" "}
                Hours
              </span>
            </p>
            <p className="flex items-center">
              <FaGraduationCap className="mr-2 text-red-600" />
              <span className="font-semibold">
                <b>Credential:</b>{" "}
                {courseDuration.credential || "Not specified"}
              </span>
            </p>

            <p className="flex items-center">
              <FaCertificate className="mr-2 text-red-600" />
              <span className="font-semibold">
                <b>Pre-Requisite:</b>{" "}
                {courseDuration.preRequisites || "Not specified"}
              </span>
            </p>
          </div>

          {/* YouTube Video Player */}

          <button
            className="w-full py-3 px-4 bg-green-400 text-white text-2xl font-semibold rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            data-aos="zoom-in"
            onClick={handleEnroll}
          >
            Enroll Now
          </button>
          <div className="mt-6 mb-4" data-aos="fade-up">
            <iframe
              className="w-full h-64 rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/-sfMwZ3dJPw"
              title="Course Introduction"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
