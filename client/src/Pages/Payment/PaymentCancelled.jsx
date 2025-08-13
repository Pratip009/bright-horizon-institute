import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentCancelled = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "https://bright-horizon-institute-2.onrender.com";

  useEffect(() => {
    const cancelPayment = async () => {
      const paymentId = searchParams.get("token");
      if (!paymentId) {
        alert("Missing payment ID");
        return navigate("/quick-programs");
      }

      try {
        await fetch(`${API_URL}/api/payment/cancel/${paymentId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert("Payment cancelled.");
        navigate("/quick-programs");
      } catch (err) {
        console.error("Cancel error:", err);
        alert("Failed to cancel payment");
        navigate("/quick-programs");
      }
    };

    cancelPayment();
  }, [searchParams, navigate]);

  return <div>Payment cancelled...</div>;
};

export default PaymentCancelled;