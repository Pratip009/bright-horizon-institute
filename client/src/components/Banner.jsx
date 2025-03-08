import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const Banner = ({ text, gradient }) => {
  return (
    <div
      className="relative w-full h-80 flex items-center justify-center rounded-2xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.15)]"
      style={{
        background: gradient || "linear-gradient(to right, #FFDEE9, #B5FFFC)", // Default Gradient
      }}
    >
      {/* SVG Animation 1 */}
      <motion.div
        className="absolute w-40 h-40 bg-white/40 rounded-full top-10 left-10"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, 20, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* SVG Animation 2 */}
      <motion.div
        className="absolute w-32 h-32 bg-white/20 rounded-full bottom-10 right-10"
        animate={{
          x: [0, -20, 20, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Text with Scale Effect */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="text-5xl font-bold text-black z-10 text-center"
        style={{
          fontFamily: "Quicksand",
          fontWeight: "800",
          textShadow: "4px 4px 12px rgba(0, 0, 0, 0.3)", // Subtle 3D Effect
        }}
      >
        {text}
      </motion.h1>
    </div>
  );
};

export default Banner;
