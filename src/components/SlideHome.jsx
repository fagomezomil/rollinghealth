import { useState, useEffect } from "react";
// import { SlideTop1 } from "./SlideTop1";
// import { SlideTop2 } from "./SlideTop2";

const SlideHome = () => {
  const [showSlideTop1, setShowSlideTop1] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setShowSlideTop1((prev) => !prev);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div className="relative pt-20 bg-gradient-to-r from-[#363633] via-[#68655c] to-[#44433f] flex flex-col justify-center items-center">
      <div className="">
        {showSlideTop1 ? "slide 1" : "slide 2"}
      </div>
      <button onClick={handleTogglePause} className="bg-neutral-800 rounded-full h-14 w-fit px-6 py-3 text-white text-lg absolute bottom-5 left-[923px]">
        {isPaused ? "Reanudar" : "Pausar"}
      </button>
    </div>
  );
};

export default SlideHome;