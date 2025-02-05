const ExpertSkills = () => {
  return (
    <div className="bg-white">
      <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
            <div>
                <span className="text-sm text-red-500 font-semibold">EXPERT LEARNING</span>
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                Develop Your Skills, Learn Something New, and Grow Your Skills.
              </h1>
              <p className="mt-2 text-lg text-gray-600 sm:mt-8">
                Bright Horizon Institute was founded in 2010 in Newark, NJ. It
                is a vocational school that offers a variety of courses for
                students with High School Diplomas or an equivalent. Our mission
                is to provide students with high-quality training programs and
                prepare them for a competitive job market.
              </p>
              <p className="mt-2 text-lg text-black-600 sm:mt-8 font-bold">
                Grow your knowledge and your opportunities with training and
                tools.
              </p>
              <button
                type="button"
                className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Explore Learning
              </button>
            </div>
            <div>
              <img
                className="w-full rounded-lg"
                src="https://img.freepik.com/free-photo/congratulations-you-did-test-very-well_637285-8618.jpg?t=st=1738663474~exp=1738667074~hmac=38e859e2dfafd9409db82429aad014969af2d7bd265182cad287ff40f78dbe56&w=996"
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
