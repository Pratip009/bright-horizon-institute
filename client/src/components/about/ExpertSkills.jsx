import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import expertImg from "../../assets/images/bhi11.jpg";
const ExpertSkills = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/courses");
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="bg-white">
      <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
            <div data-aos="fade-right">
              <span
                className="text-sm text-red-500 font-semibold"
                data-aos="fade-up"
              >
                EXPERT LEARNING
              </span>

              <h1
                className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                Develop Your Skills, Learn Something New, and Grow Your Skills.
                <span className="mr-2"></span>
              </h1>

              <p
                className="mt-8 text-base text-black sm:text-xl"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                Bright Horizon Institute was founded in 2010 in Newark, NJ. It
                is a vocational school that offers a variety of courses for
                students with High School Diplomas or an equivalent. Our mission
                is to provide students with high-quality training programs and
                prepare them for a competitive job market.
              </p>

              <p
                className="mt-2 text-lg text-black-600 sm:mt-8 font-bold"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                Grow your knowledge and your opportunities with training and
                tools.
              </p>

              <button
                onClick={handleClick}
                type="button"
                className="px-6 py-3 text-lg font-semibold text-white bg-[#F97316] rounded-lg shadow-md transition-all duration-300 hover:bg-[#DE6006FF] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                data-aos="zoom-in"
                data-aos-delay="1000"
              >
                Explore Learning
              </button>
            </div>

            <div data-aos="fade-left" data-aos-delay="500">
              <img
                className="w-full rounded-lg"
                src={expertImg}
                alt="Hero Illustration"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExpertSkills;
