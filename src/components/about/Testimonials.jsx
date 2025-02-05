import PropTypes from "prop-types"; // Import PropTypes

const testimonials = [
  {
    id: 1,
    name: "Paloma E",
    role: "Freelance React Developer",
    image:
      "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png",
    review:
      "“I like the openness of conversations, how well everyone communicates especially ms Nicoles when things get complicated. The videos and other resources are very helpful when it comes to being able to visually seeing what were previously lectured on. Also a fan of how we separate certain assignments.”",
  },
  {
    id: 2,
    name: "Jacob Jones",
    role: "Digital Marketer",
    image:
      "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png",
    review:
      "“First, I would like to start with Ms. Nicole. She is amazing teacher. She explains the information in a way that you'll understand and make the class fun at the same time. I enjoy the videos and triages because I get to see hands on experience of the information. The PowerPoints and lectures are  helpful with understanding the terms in the book as well. ”",
  },
  {
    id: 3,
    name: "Jenny Wilson",
    role: "UI/UX Designer",
    image:
      "https://media.istockphoto.com/id/1322139094/photo/multiethnic-colleagues-sitting-at-desk-looking-at-laptop-computer-in-office.jpg?s=2048x2048&w=is&k=20&c=IFXXwPnsX6__wcVlxOWJI-Ytn_OJrJ4YyTenlfaFXo8=",
    review:
      "“I appreciate all the resources and extra help that is provided. Whenever I had a question or concern Mrs. Fatima was always there to help. The MA teacher, Mrs. Meadows, is very attentive. She is knowledgeable and has much experience. So, she is always able to answer our questions and help us. ”",
  },
];

// TestimonialCard Component
const TestimonialCard = ({ testimonial }) => (
  <div className="flex flex-col overflow-hidden shadow-xl">
    <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
      <div className="flex-1">
        <div className="flex items-center">
          {Array(5)
            .fill()
            .map((_, index) => (
              <svg
                key={index}
                className="w-5 h-5 text-[#FDB241]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
        </div>

        <blockquote className="flex-1 mt-8">
          <p className="text-lg leading-relaxed text-gray-900">
            {testimonial.review}
          </p>
        </blockquote>
      </div>

      <div className="flex items-center mt-8">
        <img
          className="flex-shrink-0 object-cover rounded-full w-11 h-11"
          src={testimonial.image}
          alt={testimonial.name}
        />
        <div className="ml-4">
          <p className="text-base font-bold text-gray-900">
            {testimonial.name}
          </p>
          <p className="mt-0.5 text-sm text-gray-600">{testimonial.role}</p>
        </div>
      </div>
    </div>
  </div>
);

// Define PropTypes for TestimonialCard
TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
  }).isRequired,
};

// TestimonialSection Component
const TestimonialSection = () => {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-600">
              People have said how good Bright Horizon Institute
            </p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">
              Our happy clients say about us
            </h2>
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
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
