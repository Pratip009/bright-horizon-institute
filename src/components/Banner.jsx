import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const Banner = ({ text, imageUrl }) => {
  return (
    <div
      className="relative w-full h-80 flex items-center justify-center overflow-hidden rounded-2xl shadow-lg"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Gradient Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>

      {/* Animated Text */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-white z-10 text-center drop-shadow-lg"
        style={{ fontFamily: "Quicksand", fontWeight: "800" }}
      >
        {text}
      </motion.h1>
    </div>
  );
};

export default Banner;
