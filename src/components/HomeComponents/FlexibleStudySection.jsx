import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const StatsCard = ({ targetNumber, label, bgColor, style }) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    let start = 1;
    // eslint-disable-next-line react/prop-types
    const end = parseInt(targetNumber.replace(/\D/g, ""));
    if (start === end) return;

    let interval = setInterval(() => {
      start += Math.ceil(end / 100);
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(start);
    }, 20);

    return () => clearInterval(interval);
  }, [targetNumber]);

  return (
    <div
      className={`p-8 text-center rounded-xl shadow-2xl ${bgColor} hover:scale-105 transition-transform duration-300 relative transform-gpu`}
      style={style} // Apply the custom style here
    >
      <h2 className="text-red-500 text-4xl font-extrabold">{count}+</h2>
      <p className="text-gray-800 font-semibold uppercase text-sm tracking-wide mt-2">
        {label}
      </p>
    </div>
  );
};

const testimonials = [
  {
    text: "First, I would like to start with Ms. Nicole. She is an amazing teacher. She explains the information in a way that you'll understand and make the class fun at the same time...",
    author: "Shearnah S",
  },
  {
    text: "The courses are well-structured and easy to follow. The instructors are knowledgeable and supportive, making learning enjoyable!",
    author: "James M",
  },
  {
    text: "I highly recommend this program! The hands-on experience and expert guidance helped me achieve my goals.",
    author: "Lisa T",
  },
];

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-xl relative max-w-lg mx-auto transition-opacity duration-500 ease-in-out">
      <div className="h-32 overflow-y-hidden">
        <p className="text-gray-800 text-lg italic leading-relaxed" style={{fontFamily:'Nunito'}}>
          &quot;{testimonials[index].text}&quot;
        </p>
      </div>
      <p className="font-bold text-red-500 mt-4 text-right">
        - {testimonials[index].author}
      </p>
      <div className="flex justify-center mt-4 space-x-2">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === i ? "bg-red-500 w-4" : "bg-gray-300"
            }`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

const FlexibleStudySection = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Content */}
        <div>
          <p className="text-red-500 font-semibold uppercase tracking-wider">
            Expert Learning
          </p>

          <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
            Flexible Study at Your Own Pace, <span className="mr-2"></span>
            <div className="relative inline-flex">
              <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]"></span>
              <h1 className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                According to Your Own Needs
              </h1>
            </div>
          </h1>
          <p className="mt-8 text-base text-black sm:text-xl">
            Bright Horizon Institute was founded in 2010 in Newark, NJ. It is a
            vocational school that offers a variety of courses...
          </p>
          <div className="mt-8">
            <TestimonialSlider />
          </div>
        </div>

        {/* Right Stats Section */}
        <div className="flex flex-wrap justify-center gap-8 relative">
          <div className="relative top-0">
            <StatsCard
              targetNumber="56000"
              label="Finished Sessions"
              bgColor=""
              style={{
                backgroundImage:
                  "linear-gradient(to right, #bf953f, #fcf6ba,#b38728, #fbf5b7,#aa771c)",
              }} // Correct gradient background
            />
          </div>
          <div className="relative top-4">
            <StatsCard
              targetNumber="10000"
              label="Enrolled Learners"
              bgColor=""
              style={{
                backgroundImage:
                  "linear-gradient(to right, #666666, #f2f2f2,#666666)",
              }} // Correct gradient background
            />
          </div>
          <div className="relative top-2">
            <StatsCard
              targetNumber="50"
              label="Expert Instructors"
              bgColor=""
              style={{
                backgroundImage:
                  "linear-gradient(to right, #666666, #f2f2f2,#666666)",
              }} // Correct gradient background
            />
          </div>

          <div className="relative top-6">
            <StatsCard
              targetNumber="100"
              label="Satisfaction Rate"
              bgColor=""
              style={{
                backgroundImage:
                  "linear-gradient(to right, #bf953f, #fcf6ba,#b38728, #fbf5b7,#aa771c)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlexibleStudySection;
