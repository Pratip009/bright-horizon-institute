import PropTypes from "prop-types";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Paloma E",
    role: "Freelance React Developer",
    image: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png",
    feedback: "Bright Horizon Institute transformed my development skills. Their hands-on React training was exactly what I needed to land new clients with confidence!",
  },
  {
    id: 2,
    name: "Jacob Jones",
    role: "Digital Marketer",
    image: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png",
    feedback: "The courses at Bright Horizon are practical, engaging, and industry-relevant. I saw a real improvement in my digital marketing strategies after enrolling.",
  },
  {
    id: 3,
    name: "Jenny Wilson",
    role: "UI/UX Designer",
    image: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png",
    feedback: "Their UI/UX course helped me sharpen my design thinking and portfolio. I highly recommend Bright Horizon to anyone serious about design.",
  },
];

// Testimonial Card Component
const TestimonialCard = ({ testimonial }) => {
  return (
    <div
      className="relative group bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
      data-aos="zoom-in"
      data-aos-delay={testimonial.id * 150}
    >
      {/* Glassmorphism Background Effect */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-3xl"></div>

      <div className="relative flex flex-col p-6 lg:p-8">
        <div className="mb-6">
          <p className="text-base text-gray-700 italic leading-relaxed">
            “{testimonial.feedback}”
          </p>
        </div>

        <div className="flex items-center gap-4 z-10">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-blue-200/50 transition-transform duration-300 group-hover:scale-110"
          />
          <div>
            <p className="text-lg font-semibold text-gray-900 tracking-tight">{testimonial.name}</p>
            <p className="text-sm text-gray-600 font-medium">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    feedback: PropTypes.string.isRequired,
  }).isRequired,
};

// Testimonial Section Component
const TestimonialSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <p className="text-base text-black sm:text-xl">
              People have said how good Bright Horizon Institute
            </p>
            <h1
              className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Our happy clients say about us
            </h1>
          </div>

          <div className="relative mt-10 md:mt-24">
            <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
              <div
                className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                style={{
                  background:
                    "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                }}
              ></div>
            </div>

            <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
