

// export default CourseCard;
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import "./CourseCard.css";

// eslint-disable-next-line react/prop-types
const CourseCard = ({ courses }) => {
  return (
    <div className="courses-container">
      {courses.map((course) => (
        <div key={course.id} className="card">
          {/* Image section */}
          <div className="img">
            <img src={course.image} alt={course.title} />
          </div>

          {/* Course title */}
          <span>{course.title}</span>

          {/* Course details */}
          <div className="times">
            <p
              className="info"
              style={{ display: "flex", alignItems: "center" }}
            >
              <FaClock className="mr-1 text-red-500" />
              {course.time}
            </p>
            <p
              className="info"
              style={{ display: "flex", alignItems: "center" }}
            >
              <SlCalender className="mr-1 text-red-500" />
              {course.programTime}
            </p>
          </div>

          <p className="info">
            <b>Certification:</b> {course.certification}
          </p>
          <p className="info">
            <b>Credential:</b> {course.credential}
          </p>
          <p className="info">
            <b>Job:</b> {course.job}
          </p>

          {/* Button */}
          <Link to={`/courses/${course.id}`}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              View Programs <FaRegArrowAltCircleRight className="ml-3" />
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
