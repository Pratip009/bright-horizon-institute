import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const payerID = query.get("PayerID");
    const orderID = query.get("orderID"); // For JavaScript SDK compatibility

    if (token && payerID) {
      // Express Checkout: Verify payment on backend
      axios
        .post("/api/complete-payment", { token, payerID })
        .then((response) => {
          console.log("Payment verified:", response.data);
        })
        .catch((err) => {
          console.error("Payment verification failed:", err);
          navigate("/payment-cancel");
        });
    } else if (orderID) {
      // JavaScript SDK: Verify orderID on backend
      axios
        .post("/api/verify-payment", { orderID })
        .then((response) => {
          console.log("Order verified:", response.data);
        })
        .catch((err) => {
          console.error("Order verification failed:", err);
          navigate("/payment-cancel");
        });
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <div className="text-center py-12">
      <h2 className="text-3xl font-bold text-gray-900">Payment Successful</h2>
      <p className="text-lg text-gray-700 mt-4">
        Thank you for your payment! Your enrollment is being processed.
      </p>
    </div>
  );
};

export default PaymentSuccess;