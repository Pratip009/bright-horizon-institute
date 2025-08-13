/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaClock, FaDollarSign, FaHourglassHalf, FaClipboardList } from "react-icons/fa";
import SpinnerLoader from "../../components/Loader";
import jwt_decode from "jwt-decode"; // static import works with Vite

const QuickProgramsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsSignedIn(!!token);

    const fetchProgram = async () => {
      try {
        const response = await fetch(`${API_URL}/api/quick-programs/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProgram(data);
      } catch (err) {
        console.error("Fetch program error:", err);
        setProgram(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id, API_URL]);

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    let userId;
    try {
      const decoded = jwt_decode(token);
      userId = decoded.id || decoded._id;
    } catch (err) {
      console.error("Invalid token", err);
      setErrorMessage("Invalid session. Please login again.");
      return;
    }

    setErrorMessage(null);
    setPaymentLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: program.price,
          userId,
          courseId: program._id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Show detailed backend error
        console.error("Backend error:", data);
        throw new Error(data.message || "Payment request failed");
      }

      // Redirect to PayPal approval link
      if (data.approval_url) {
        window.location.href = data.approval_url;
      } else {
        throw new Error("PayPal approval URL missing from response");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setErrorMessage(err.message || "PayPal payment failed");
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleEnrollClick = () => {
    if (!isSignedIn) {
      navigate("/login");
    } else {
      setShowPaymentOptions(true);
    }
  };

  if (loading) return <div className="flex items-center justify-center py-12"><SpinnerLoader size={48} /></div>;
  if (!program) return <div className="text-center mt-12 text-gray-600 font-medium">Program not found.</div>;

  const { title, imgUrl, price, duration, totalHours, prerequisite, description, content } = program;
  const displayPrerequisite = prerequisite?.trim() || "Nothing";

  return (
    <div className="container mx-auto mt-16 font-nunito">
      {errorMessage && <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 text-center">{errorMessage}</div>}
      
      <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-12">
        {/* Left: Image + Tabs */}
        <div className="lg:w-2/3 w-full space-y-6">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img src={imgUrl} alt={title} className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <h1 className="absolute bottom-6 left-6 text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{title}</h1>
          </div>

          <div className="flex justify-center space-x-6 border-b border-gray-300 mb-4">
            {["description", "contents", "duration"].map((tab) => (
              <button key={tab} className={`py-2 px-4 text-lg font-semibold transition-colors duration-300 ${activeTab === tab ? "border-b-4 border-green-400 text-green-400" : "text-gray-600 hover:text-green-400"}`} onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div>
            {activeTab === "description" && <div className="text-base sm:text-xl text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />}
            {activeTab === "contents" && (
              <ul className="list-disc pl-6 space-y-2 text-base sm:text-xl text-gray-800">
                {content?.length > 0 ? content.map((item, idx) => <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />) : <li>No course content available</li>}
              </ul>
            )}
            {activeTab === "duration" && (
              <div className="space-y-2 text-base sm:text-xl text-gray-800">
                <p><strong>Prerequisite:</strong> {displayPrerequisite}</p>
                <p><strong>Total Hours:</strong> {totalHours || "Not specified"} Hours</p>
                <p><strong>Duration:</strong> {duration || "Not specified"}</p>
                <p><strong>Price:</strong> ${price}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Sidebar Info */}
        <div className="lg:w-1/3 w-full bg-white p-6 rounded-2xl shadow-lg self-start">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">{title}</h2>
          <div className="flex flex-col gap-4 mb-6">
            <InfoCard icon={<FaDollarSign />} label="Price" value={`$${price}`} color="indigo" />
            <InfoCard icon={<FaClock />} label="Duration" value={duration} color="green" />
            <InfoCard icon={<FaHourglassHalf />} label="Total Hours" value={totalHours} color="orange" />
            <InfoCard icon={<FaClipboardList />} label="Prerequisite" value={displayPrerequisite} color="red" />
          </div>

          {!showPaymentOptions ? (
            <button className={`w-full py-3 px-4 text-white text-2xl font-semibold rounded-xl shadow-lg transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 ${isSignedIn ? "bg-green-400 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700"}`} onClick={handleEnrollClick}>
              {isSignedIn ? "Enroll Now" : "Sign in to Enroll"}
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <button onClick={handlePayment} disabled={paymentLoading} className="w-full py-2 rounded-lg text-white font-semibold text-center text-lg bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-600 shadow hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 hover:scale-105">
                {paymentLoading ? "Processing..." : `Pay Full $${price}`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className={`text-${color}-600 text-3xl`}>{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

export default QuickProgramsDetails;
