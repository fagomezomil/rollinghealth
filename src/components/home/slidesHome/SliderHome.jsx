import { useState, useEffect } from "react";
import SlideHomeContainer from "./SlideHomeContainer";
import { IoChevronBackCircle, IoChevronForwardCircle, IoPauseCircle, IoPlayCircle } from "react-icons/io5";
import { slidesData } from "../../../utils/slidesData";

const SliderHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, slidesData.length]);

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slidesData.length) % slidesData.length);
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
  };

  return (
    <div className="relative mt-20 pb-14 lg:pb-0">
      <div className="">
        <SlideHomeContainer data={slidesData[currentIndex]} />
      </div>
      <div className="absolute bottom-5 left-6 lg:left-12">
        <button className="slide-control-button" onClick={handlePrevSlide}>
          <IoChevronBackCircle />
        </button>
        <button onClick={handleTogglePause} className="slide-control-button">
          {isPaused ? <IoPlayCircle /> : <IoPauseCircle />}
        </button>
        <button className="slide-control-button" onClick={handleNextSlide}>
          <IoChevronForwardCircle />
        </button>
      </div>
    </div>
  );
};

export default SliderHome;