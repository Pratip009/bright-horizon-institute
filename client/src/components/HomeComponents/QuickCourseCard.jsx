
import PropTypes from "prop-types";

const QuickCourseCard = ({ program }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 max-w-sm shadow-md m-3 flex flex-col">
      <img
        src={program.imgUrl}
        alt={program.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-xl font-semibold mt-4">{program.title}</h3>
      <p className="mt-2 text-gray-700">
        <span className="font-semibold">Price:</span> ${program.price}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Duration:</span> {program.duration}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Total Hours:</span> {program.totalHours}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Credential:</span> {program.credential}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Certification:</span> {program.certification}
      </p>
      <div
        className="mt-3 text-gray-600 text-sm"
        dangerouslySetInnerHTML={{ __html: program.description }}
      ></div>
    </div>
  );
};

QuickCourseCard.propTypes = {
  program: PropTypes.shape({
    imgUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    duration: PropTypes.string.isRequired,
    totalHours: PropTypes.string.isRequired,
    credential: PropTypes.string.isRequired,
    certification: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuickCourseCard;
