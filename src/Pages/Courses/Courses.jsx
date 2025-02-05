// src/components/Courses.js

import { Link } from 'react-router-dom';
import Banner from '../../components/Banner';
import { useEffect } from 'react';

const courses = [
  { id: 1, name: 'React for Beginners' },
  { id: 2, name: 'Advanced JavaScript' },
  { id: 3, name: 'Web Development Bootcamp' },
];

const Courses = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className="container mt-5">
      <div className="" style={{ marginTop: "7rem" }}>
        <Banner
          text="Courses"
          gradient="bg-gradient-to-r from-purple-100 to-blue-500"
        />
      </div>
     
      <ul className="list-group">
        {courses.map(course => (
          <li key={course.id} className="list-group-item">
            <Link to={`/courses/${course.id}`} className="text-decoration-none">
              {course.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
