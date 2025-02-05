const features = [
  { icon: "🎓", text: "Expert Trainers" },
  { icon: "💻", text: "Remote Learning" },
  { icon: "⏳", text: "Lifetime Access" },
  { icon: "🚀", text: "Self Development" },
];

const BlogSection = () => {
  return (
    <section className="bg-cream px-8 py-16 md:px-20 flex flex-col md:flex-row items-center gap-12">
      {/* Images Section */}
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-gradient-to-r from-red-400 to-yellow-300 rounded-full opacity-40 blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-r from-green-400 to-blue-300 rounded-full opacity-40 blur-xl"></div>

      {/* Images Section */}
      <div className="flex-1 grid grid-cols-2 gap-6 relative">
        {/* First Image */}
        <div className="relative bg-white p-3 rounded-xl shadow-lg border-3 border-red-400 border-dashed border-gradient-to-r from-green-500 to-blue-500 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <img
            src="https://img.freepik.com/free-photo/education-elementary-school-learning-people-concept-group-school-kids-with-teacher-sitting-classroom-vintage-effect-style-pictures_1253-1372.jpg?t=st=1738730960~exp=1738734560~hmac=c11542bba8b1eb893a1194f4f1d06b05c27647a10d67a33444d99ae43e326cf6&w=996"
            alt="Team Collaboration"
            className="rounded-xl"
          />
        </div>

        {/* Second Image */}
        <div className="relative bg-white p-3 rounded-xl shadow-lg border-3 border-green-400 border-dashed border-gradient-to-r from-red-500 to-pink-500 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <img
            src="https://img.freepik.com/free-photo/close-up-young-business-person-doing-internship_23-2149305380.jpg?t=st=1738730983~exp=1738734583~hmac=c449806c97bccaca4c59e91cd4edd96fa9a45d613de1ebf836b8a84a0d424df7&w=996"
            alt="Casual Discussion"
            className="rounded-xl"
          />
        </div>

        {/* Third Image - Larger */}
        <div className="relative bg-white p-3 rounded-xl shadow-lg border-3 border-blue-400 border-dashed border-gradient-to-r from-purple-500 to-blue-500 col-span-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <img
            src="https://img.freepik.com/free-photo/young-students-classroom_329181-13015.jpg?t=st=1738731004~exp=1738734604~hmac=73aeb9c9f6635927a735752c51bcf32c31d970e7b9da37930192008a38cf99ba&w=996"
            alt="Team Working Together"
            className="rounded-xl"
          />
        </div>
      </div>

      {/* Text Content Section */}
      <div className="flex-1 text-left">
        <p className="text-red-500 font-semibold uppercase text-sm">
          Online Learning
        </p>

        <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
          Develop Your Skills, Learn Something New,and{" "}
          <span className="mr-2"></span>
          <div className="relative inline-flex">
            <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]"></span>
            <h1 className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
              Grow Your Skills.
            </h1>
          </div>
        </h1>
        <p className="mt-8 text-base text-black sm:text-xl">
          We understand that better learning can make a significant change to
          reach students from all over the world! Giving options to learn better
          always offers the best outcomes! Our mission is to provide students
          with high-quality training programs and prepare them for a competitive
          job market.
        </p>

        {/* Features List */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105"
            >
              <span className="text-red-500 text-2xl">{feature.icon}</span>
              <span className="font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent text-sm sm:text-base md:text-lg">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          className="mt-12 bg-[#4ADE80] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2"
          style={{ marginTop: "20px", borderRadius: "20px" }}
        >
          📚 View All Courses
        </button>
      </div>
    </section>
  );
};

export default BlogSection;
