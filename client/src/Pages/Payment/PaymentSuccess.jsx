import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    const verifyPayment = async () => {
      const paymentId = searchParams.get("paymentId");
      const payerId = searchParams.get("PayerID"); // PayPal param
      const token = localStorage.getItem("token");

      if (!paymentId || !payerId) {
        setMessage("Invalid payment details");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/purchases/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ paymentId, payerId }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Verification failed");

        setMessage("Payment successful! Redirecting to your courses...");
        setTimeout(() => navigate("/my-courses"), 2000);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? <p>Verifying payment...</p> : <p>{message}</p>}
    </div>
  );
};

export default PaymentSuccess;
