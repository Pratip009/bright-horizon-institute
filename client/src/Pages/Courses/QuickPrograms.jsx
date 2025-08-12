import { useEffect, useState } from "react";

const QuickPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
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
    <div className="flex flex-col items-center mt-8 space-y-4">
      {programs.length === 0 ? (
        <p className="text-gray-600">No programs available.</p>
      ) : (
        programs.map((program) => (
          <div
            key={program._id}
            className="border p-4 rounded shadow w-80 text-center"
          >
            <h3 className="text-xl font-semibold">{program.title}</h3>
            <p className="text-gray-600">{program.description}</p>
            <p className="mt-2 font-medium">Price: ${program.price}</p>
            <p>Duration: {program.duration}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default QuickPrograms;
