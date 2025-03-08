/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaClock, FaRegArrowAltCircleRight } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import "./CourseCard.css";


const CourseCard = ({ courses }) => {
  return (
    <div className="courses-container">
      {courses.map((course) => (
        <div key={course.id} className="card">
          {/* Image section */}
          <div className="img">
            <img src={course.imgUrl} alt={course.title} />
          </div>

          {/* Course title */}
          <span className="course-title">{course.title}</span>

          {/* Course details */}
          <div className="course-details">
            <p className="info">
              <FaClock className="mr-1 text-red-500" />
              {course.totalHours}
            </p>
            <p className="info">
              <SlCalender className="mr-1 text-red-500" />
              {course.duration}
            </p>
          </div>

          {/* Additional course info */}
          <div className="additional-info">
            <p className="info">
              <b>Certification:</b> {course.certification}
            </p>
            <p className="info">
              <b>Credential:</b> {course.credential}
            </p>
            <p className="info">
              <b>Job:</b> {course.certification}
            </p>
          </div>

          {/* Button */}
          <Link to={`/courses/${course._id}`} className="view-button">
            <button style={{
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
            }}>
              View Programs <FaRegArrowAltCircleRight className="ml-3" />
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
