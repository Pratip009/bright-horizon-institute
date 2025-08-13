/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaClock, FaDollarSign, FaHourglassHalf } from "react-icons/fa";

const InfoItem = ({ icon, label, value }) => (
  <div className="flex flex-col items-center min-w-[60px] text-center p-1">
    <div className="text-indigo-600 text-lg mb-0.5">{icon}</div>
    <span className="text-[10px] font-medium uppercase tracking-wide text-gray-500">
      {label}
    </span>
    <span className="font-semibold text-gray-900 text-sm">{value}</span>
  </div>
);

const QuickCourseCard = ({ program, featured }) => {
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const truncateDescription = (text, wordLimit = 12) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className="relative max-w-xs bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden transform hover:-translate-y-1 hover:scale-105 group">
      
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-2 py-0.5 rounded-full font-semibold text-xs shadow-md">
          Featured
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-40 overflow-hidden rounded-t-2xl shadow-inner shadow-gray-200">
        {program.imgUrl ? (
          <img
            src={program.imgUrl}
            alt={program.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-semibold tracking-wide text-sm">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow bg-white/90 rounded-b-2xl">
        <h3 className="text-gray-900 text-base font-semibold tracking-wide mb-1 truncate">
          {program.title}
        </h3>

        <p className="text-gray-700 flex-grow mb-2 leading-snug font-sans text-xs">
          {truncateDescription(stripHtml(program.description), 12)}
        </p>

        {/* Info Row */}
        <div className="flex justify-between flex-wrap gap-2 mb-3 border-t border-b border-gray-200 py-2">
          <InfoItem icon={<FaClock />} label="Duration" value={program.duration} />
          <InfoItem icon={<FaHourglassHalf />} label="Hours" value={program.totalHours} />
          <InfoItem icon={<FaDollarSign />} label="Price" value={`$${program.price}`} />
        </div>

        {/* CTA */}
        <Link
          to={`/quick-programs/${program._id}`}
          className="mt-auto py-2 rounded-lg text-white font-semibold text-center text-sm bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-600 shadow hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 hover:scale-105"
          aria-label={`View details about ${program.title}`}
          style={{ textDecoration: "none" }}
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

export default QuickCourseCard;
