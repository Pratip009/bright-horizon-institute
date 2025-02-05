// src/components/CourseDetail.js

import { useParams } from 'react-router-dom';

const courseDetails = {
  1: { name: 'React for Beginners', description: 'Learn the basics of React.js.' },
  2: { name: 'Advanced JavaScript', description: 'Dive deep into JavaScript.' },
  3: { name: 'Web Development Bootcamp', description: 'Become a full-stack developer.' },
};

const CourseDetail = () => {
  const { id } = useParams();
  const course = courseDetails[id];

  if (!course) return <p>Course not found!</p>;

  return (
    <div className="container mt-5">
      <h1>{course.name}</h1>
      <p>{course.description}</p>
    </div>
  );
};

export default CourseDetail;
