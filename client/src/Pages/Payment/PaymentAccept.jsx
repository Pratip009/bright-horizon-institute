import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Replace with your sandbox or live Client ID
const PAYPAL_CLIENT_ID = "AU2Zk1eX5T24Nd_uEwp6uu0i-0pSAeonc6v5b8uAa2NrE00_gZZ34bPUHTSbeWaGKqnSnxWq-nLChD18";

const PaymentAccept = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-xl font-semibold text-gray-700">
          No course details found. Please go back and select a course.
        </p>
      </div>
    );
  }

  const coursePrice = course.price && !isNaN(parseFloat(course.price))
    ? parseFloat(course.price).toFixed(2)
    : "10.00";

  // For Express Checkout (uncomment if using backend-driven flow)
  /*
  useEffect(() => {
    if (showModal) {
      axios
        .post('/api/create-payment', { course })
        .then(response => {
          window.location.href = response.data.forwardLink; // Redirect to PayPal
        })
        .catch(err => {
          setError('Failed to initiate payment. Please try again.');
          console.error(err);
        });
    }
  }, [showModal, course]);
  */

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative bg-white p-10 rounded-3xl shadow-[0px_10px_30px_rgba(0,0,0,0.1)] max-w-2xl text-center transform transition duration-500 hover:scale-105">
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
          <li className="flex items-center">✅ 100% job placement support after completion</li>
        </ul>

        <button
          onClick={() => setShowModal(true)}
          className="mt-6 w-full py-3 bg-red-500 text-white text-xl font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-red-700 transition-all duration-300"
        >
          Proceed to Payment
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Enroll for {course.title}</h3>
            <p className="text-gray-700 mb-6">Complete your payment of ${coursePrice} to enroll in this course.</p>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <PayPalScriptProvider
              options={{
                "client-id": PAYPAL_CLIENT_ID,
                currency: "USD",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: coursePrice,
                          currency_code: "USD",
                        },
                        description: `Payment for ${course.title}`,
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  try {
                    await actions.order.capture();
                    navigate(`/payment-success?orderID=${data.orderID}`);
                  } catch (err) {
                    setError("Payment failed. Please try again.");
                    console.error("PayPal Capture Error:", err);
                  }
                }}
                onCancel={() => {
                  navigate("/payment-cancel");
                }}
                onError={(err) => {
                  setError("An error occurred with PayPal. Please try again.");
                  console.error("PayPal Error:", err);
                }}
              />
            </PayPalScriptProvider>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentAccept;