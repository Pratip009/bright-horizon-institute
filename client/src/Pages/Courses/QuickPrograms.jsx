import { useEffect, useState } from "react";
import QuickCourseCard from "../../components/HomeComponents/QuickCourseCard";

const QuickPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/quick-programs`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPrograms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  if (loading)
    return <div className="text-center mt-8">Loading quick programs...</div>;

  if (error)
    return (
      <div className="text-center mt-8 text-red-500">
        Error loading programs: {error}
      </div>
    );

  return (
    <div className="flex flex-wrap justify-center gap-8 mt-8 px-4">
      {programs.length === 0 ? (
        <p className="text-gray-600">No programs available.</p>
      ) : (
        programs.map((program) => (
          <QuickCourseCard key={program._id} program={program} />
        ))
      )}
    </div>
  );
};

export default QuickPrograms;
