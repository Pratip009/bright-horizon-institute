import { useLocation } from "react-router-dom";

const PaymentAccept = () => {
  const location = useLocation();
  const course = location.state?.course;

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-xl font-semibold text-gray-700">
          No course details found. Please go back and select a course.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative bg-white p-10 rounded-3xl shadow-[0px_10px_30px_rgba(0,0,0,0.1)] max-w-2xl text-center transform transition duration-500 hover:scale-105">
        {/* Floating Shadow Layer for 3D Effect */}
        <div className="absolute inset-0 bg-white rounded-3xl -z-10 shadow-[0px_15px_40px_rgba(0,0,0,0.2)]"></div>

        <h2 className="text-3xl font-bold text-gray-900">
          {course.title} from Bright Horizon Institute, New Jersey
        </h2>

        <p className="mt-4 text-lg font-semibold text-gray-700">
          This course will include:
        </p>
        <ul className="text-gray-700 text-lg mt-2 text-left mx-auto max-w-md space-y-2">
          <li className="flex items-center">✅ Live sessions (Online/In-person)</li>
          <li className="flex items-center">
            ✅ Course duration: {course.CourseDuration?.calendarLength || "Not specified"}
          </li>
          <li className="flex items-center">
            ✅ 100% job placement support after completion
          </li>
        </ul>

        {/* Payment Button */}
        <button className="mt-6 w-full py-3 bg-red-500 text-white text-xl font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-red-700 transition-all duration-300">
          🔗 Payment Acceptance
        </button>
      </div>
    </div>
  );
};

export default PaymentAccept;
