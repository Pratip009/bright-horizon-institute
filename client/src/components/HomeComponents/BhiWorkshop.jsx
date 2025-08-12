import workshop from "../../assets/images/workshops.png";

const BhiWorkshop = () => {
  return (
    <section className="text-center py-16" data-aos="fade-up">
      <div className="w-full bg-white px-6 font-outfit">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Left - Image */}
          <div className="w-full md:w-2/3">
            <img
              src={workshop}
              alt="BHI Workshop"
              className="w-full h-auto rounded-xl"
            />
          </div>

          {/* Right - Text & Link */}
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              BHI Workshop
            </h2>
            <p className="text-gray-600 mb-6">
              Upgrade your skills with our interactive, hands-on workshop
              experience. Whether you&apos;re just getting started or refining
              your talents, there&apos;s something for everyone.
            </p>
            <a
              href="https://bhiworkshops.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#FF4E00] text-white px-6 py-3 rounded-full text-base font-medium hover:bg-orange-600 transition"
              style={{ textDecoration: "none" }}
            >
              Visit Workshop
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BhiWorkshop;
