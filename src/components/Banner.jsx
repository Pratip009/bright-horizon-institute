import { motion } from 'framer-motion';

// eslint-disable-next-line react/prop-types
const Banner = ({ text ,gradient}) => {
  return (
    <div className={`relative w-full h-64 ${gradient} flex items-center justify-center overflow-hidden rounded-2xl shadow-lg`}>
      {/* Abstract Background Shapes */}
      <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-80 h-80 bg-white opacity-15 rounded-full blur-2xl bottom-10 right-10"></div>
      
      {/* Animated Text */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-black z-10"
        style={{fontFamily:'Quicksand', fontWeight:'800'}}
      >
        {text}
      </motion.h1>
    </div>
  );
};

export default Banner;
