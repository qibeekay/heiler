import React, { useState, useRef, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface Props {
  close: () => void; // Correct type for close function
}

const AmbulanceModal: React.FC<Props> = ({ close }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true, // Enable looping
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel); // Update the current slide index
    },
  });

  const totalSlides = 2; // Adjust this number based on your actual slides
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start automatic sliding
  useEffect(() => {
    if (slider) {
      timerRef.current = setInterval(() => {
        slider.current?.moveToIdx(slider.current.track.details.rel + 1);
      }, 3000); // Slide every 3 seconds
    }

    // Cleanup interval on component unmount
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slider]);

  return (
    <div>
      <div className="w-full min-h-screen bg-black/25 fixed left-0 top-0 z-[100] flex flex-col items-center justify-center">
        <div className="">
          <div className="w-[450px] md:w-[756px] bg-white rounded-lg px-[80px] py-[40px] flex flex-col gap-7 relative overflow-hidden">
            {/* Close Button */}
            <div className="w-full flex items-center justify-center">
              <button onClick={close}>
                <img src={"/Xbtn.png"} alt="Close" />
              </button>
            </div>

            {/* Slider Image */}
            <div ref={sliderRef} className="keen-slider">
              <div className="keen-slider__slide number-slide1">
                <div className="w-full flex items-center justify-center">
                  <img src="/Ambulance1.png" alt="Ambulance 1" />
                </div>
              </div>
              <div className="keen-slider__slide number-slide2">
                <div className="w-full flex items-center justify-center">
                  <img src="/Ambulance2.png" alt="Ambulance 2" />
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-3 rounded-full ${
                    currentSlide === idx
                      ? "bg-greens w-10 "
                      : "bg-gray-300 w-3 "
                  }`}
                ></div>
              ))}
            </div>

            {/* Text */}
            <div className="text-center w-full">
              <h1 className="text-lg md:text-[32px] font-semibold text-dark">
                Request an Ambulance
              </h1>
              <p className="md:text-[20px] text-[#A7ADBE]">
                We respond promptly to emergency situations
              </p>
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-5">
              <button className="px-4 py-2 text-white bg-greens border border-greens rounded">
                Call +2347066354763
              </button>
              <button className="px-4 py-2 text-greens bg-white border border-greens rounded">
                Call +2347066354763
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceModal;
