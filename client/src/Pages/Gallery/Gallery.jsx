import { useEffect, useState } from "react";
import GlobalApi from "../../services/GlobalApi"; 
import Banner from "../../components/Banner";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await GlobalApi.getGallery();
        const data = response.data.data;

        const formattedData = data.map((item) => ({
          title: item.attributes.title,
          imageUrl: item.attributes.image.data.attributes.url,
        }));

        setGalleryItems(formattedData);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="container mx-auto px-4 mt-10">
      <Banner 
        text="Our Gallery" 
        imageUrl="https://img.freepik.com/free-photo/portrait-group-happy-students-casual-outfit-with-books-while-standing_8353-6397.jpg"
      />

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {galleryItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            {/* Image */}
            <img
              className="w-full h-64 object-cover rounded-xl"
              src={item.imageUrl}
              alt={item.title}
            />

            {/* Title Below Image */}
            <div className="w-full bg-white text-center p-3 mt-2 rounded-b-xl">
              <span className="text-lg font-semibold text-gray-800">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
