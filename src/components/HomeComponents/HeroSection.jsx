import { useEffect, useRef } from "react";
import "./HeroSection.css"; // Ensure CSS is imported separately
import slider1 from "../../assets/slider/bhi1.jpg"
import slider2 from "../../assets/slider/bhi2.jpg"
import slider3 from "../../assets/slider/bhi3.jpg"
import slider4 from "../../assets/slider/bhi4.jpg"
const images = [
  slider1,
  slider2,
  slider3,
  slider4
];

const HeroSection = () => {
  const listRef = useRef(null);
  const carouselRef = useRef(null);
  const runningTimeRef = useRef(null);
  
  let timeRunning = 3000;
  let timeAutoNext = 7000;

  useEffect(() => {
    resetTimeAnimation();
    const runNextAuto = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);

    return () => clearTimeout(runNextAuto);
  }, []);

  const resetTimeAnimation = () => {
    if (runningTimeRef.current) {
      runningTimeRef.current.style.animation = "none";
      void runningTimeRef.current.offsetHeight; // Trigger reflow
      runningTimeRef.current.style.animation = "runningTime 7s linear 1 forwards";
    }
  };

  const showSlider = (type) => {
    if (!listRef.current || !carouselRef.current) return;
    const sliderItemsDom = listRef.current.querySelectorAll(".item");
    if (type === "next") {
      listRef.current.appendChild(sliderItemsDom[0]);
      carouselRef.current.classList.add("next");
    } else {
      listRef.current.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
      carouselRef.current.classList.add("prev");
    }

    setTimeout(() => {
      carouselRef.current.classList.remove("next", "prev");
    }, timeRunning);

    resetTimeAnimation();
  };

  return (
    <div className="carousel" ref={carouselRef}>
      <div className="list" ref={listRef}>
        {images.map((image, index) => (
          <div key={index} className="item" style={{ backgroundImage: `url(${image})` }}>
            <div className="content">
              <div className="title">SLIDER</div>
              <div className="name">Image {index + 1}</div>
              <div className="des">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
              <div className="btn">
                <button>See More</button>
                <button>Subscribe</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="arrows">
        <button className="prev" onClick={() => showSlider("prev")}>&lt;</button>
        <button className="next" onClick={() => showSlider("next")}>&gt;</button>
      </div>
      <div className="timeRunning" ref={runningTimeRef}></div>
    </div>
  );
};

export default HeroSection;
