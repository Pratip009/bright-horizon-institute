const CertificationBanner = () => {
  return (
    <div className="relative bg-white py-12 px-6 text-center flex flex-col items-center">
      {/* Background Elements */}
      <div className="absolute top-5 left-5 w-12 h-12 bg-red-300 rounded-full opacity-50"></div>
      <div className="absolute top-10 right-10 w-8 h-8 border-2 border-red-500 rounded-full"></div>
      <div className="absolute bottom-10 right-0 w-32 h-32 bg-gray-200 opacity-20 transform rotate-12"></div>

      <p className="text-red-500 font-semibold uppercase tracking-wide">
        Affordable Certification
      </p>

      <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
        Get Your Quality Skills <span className="mr-2"></span>
        <div className="relative inline-flex">
          <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]"></span>
          <h1 className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
            Certificate
          </h1>
        </div>
      </h1>
      <p className="mt-8 text-base text-black sm:text-xl">
        Students friendly pricing for the certificate programs helps <br />{" "}
        individuals to get their skill certificate easier than ever!
      </p>

      <button className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-md flex items-center gap-2 hover:bg-red-600 transition">
        📱 Get Started Now
      </button>
    </div>
  );
};

export default CertificationBanner;
