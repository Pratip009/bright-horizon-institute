import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

const FloatingButtons = () => {
  const phoneNumber = "15518043663"; // Ensure correct format
  const emailAddress = "training@brighthorizoninstitute.com"; // Replace with actual email

  const openWhatsApp = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  const openEmail = () => {
    window.open(`mailto:${emailAddress}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
      {/* Email Button */}
      <button
        onClick={openEmail}
        className="bg-blue-500 text-white w-14 h-14 rounded-full shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center"
      >
        <FaEnvelope className="text-2xl" />
      </button>

      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="bg-green-500 text-white w-14 h-14 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center justify-center"
      >
        <FaWhatsapp className="text-3xl" />
      </button>
    </div>
  );
};

export default FloatingButtons;
