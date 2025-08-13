import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="relative bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-lg text-center">
        <h2 className="text-4xl font-bold text-green-600 mb-6">🎉 Payment Successful!</h2>
        <p className="text-lg text-gray-700 mb-6">Thank you for your payment. Your enrollment is confirmed!</p>
        <Link to="/" className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all duration-300" style={{ textDecoration:'none' }}>
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
