import React, { useEffect, useRef, useState } from "react";

const videoSources = {
  "a": "https://tensorcraft.s3.us-east-2.amazonaws.com/TensorCraftFirstVideo-ezgif.com-crop-video.webm",
  "b": "placeholder2.webm",
  "c": "placeholder3.webm",
  "d": "placeholder4.webm",
};

const EasyAs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  type VideoSourceKey = keyof typeof videoSources;
  const [selected, setSelected] = useState<VideoSourceKey>("a");

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            sectionObserver.disconnect(); // Stop observing once it becomes visible
          }
        });
      },
      { threshold: 0.0 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
      
    }

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
    };
  }, []);


  const getDescriptionText = () => {
    switch (selected) {
      case "a":
        return "draging layers and operators over from the toolbox into the playground";
      case "b":
        return "connecting, deleting, and moving layers";
      case "c":
        return "defining the parameters on each layer";
      case "d":
        return "watching your model get created in real time";
      default:
        return "";
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`container mx-auto px-4 lg:w-2/3 mt-32 ${isVisible ? "animate__animated animate__slideInUp" : ""
        }`}
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold">It's as Easy As...</h2>
        <p className="text-gray-600 mt-4 z-0">{`${getDescriptionText()}`}</p>
      </div>
      <ul className="flex flex-row justify-center items-stretch rounded-full border border-gray-300 p-1">
        <li className="flex-1 text-center flex">
          <input
            type="radio"
            name="features"
            id="a"
            className="hidden"
            checked={selected === "a"}
            onChange={() => setSelected("a")}
          />
          <label
            htmlFor="a"
            className={`cursor-pointer py-2.5 px-4 rounded-full flex items-center justify-center w-full ${selected === "a"
                ? "bg-white text-black font-medium border border-gray-200"
                : "text-gray-400"
              }`}
          >
            Drag-and-Drop
          </label>
        </li>
        <li className="flex-1 text-center flex">
          <input
            type="radio"
            name="features"
            id="b"
            className="hidden"
            checked={selected === "b"}
            onChange={() => setSelected("b")}
          />
          <label
            htmlFor="b"
            className={`cursor-pointer py-2.5 px-4 rounded-full flex items-center justify-center w-full ${selected === "b"
                ? "bg-white text-black font-medium border border-gray-200"
                : "text-gray-400"
              }`}
          >
            Connect Your Layers
          </label>
        </li>
        <li className="flex-1 text-center flex">
          <input
            type="radio"
            name="features"
            id="c"
            className="hidden"
            checked={selected === "c"}
            onChange={() => setSelected("c")}
          />
          <label
            htmlFor="c"
            className={`cursor-pointer py-2.5 px-4 rounded-full flex items-center justify-center w-full ${selected === "c"
                ? "bg-white text-black font-medium border border-gray-200"
                : "text-gray-400"
              }`}
          >
            Define Your Layers
          </label>
        </li>
        <li className="flex-1 text-center flex">
          <input
            type="radio"
            name="features"
            id="d"
            className="hidden"
            checked={selected === "d"}
            onChange={() => setSelected("d")}
          />
          <label
            htmlFor="d"
            className={`cursor-pointer py-2.5 px-4 rounded-full flex items-center justify-center w-full ${selected === "d"
                ? "bg-white text-black font-medium border border-gray-200"
                : "text-gray-400"
              }`}
          >
            Watch Your Model Compile
          </label>
        </li>
      </ul>

      <div
        className={`w-full h-full pt-16 ${isVisible ? "animate__animated animate__slideInUp" : ""
          }`}
      >
        <div className="relative bg-opacity-10 border border-black border-opacity-5 p-4 rounded-lg bg-gray-500 scale-110">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="will-change-auto object-cover w-full h-auto z-20"
        >
          <source src={videoSources[selected]} type="video/webm" />
          Your browser does not support the video tag.
        </video>



        </div>
        {isVisible && (
          <>
            <div
              className={`absolute top-16 right-0 w-60 h-60 bg-green-500 rounded-full blur-3xl -z-50 transition-opacity duration-500 ${selected === "c" ? "opacity-100" : "opacity-0"
                }`}
            ></div>
            <div
              className={`absolute bottom-0 left-0 w-80 h-80 bg-red-400 rounded-full blur-3xl -z-50 transition-opacity duration-500 ${selected === "c" ? "opacity-100" : "opacity-0"
                }`}
            ></div>

            <div
              className={`absolute top-32 -left-6 w-60 h-60 bg-green-500 rounded-full blur-3xl -z-50 transition-opacity duration-500 ${selected === "b" ? "opacity-100" : "opacity-0"
                }`}
            ></div>
            <div
              className={`absolute bottom-0 right-0 w-80 h-80 bg-red-400 rounded-full blur-3xl -z-50 transition-opacity duration-500 ${selected === "b" ? "opacity-100" : "opacity-0"
                }`}
            ></div>

            <div
              className={`absolute bottom-32 right-0 w-60 h-60 bg-green-500 rounded-full blur-3xl -z-50 transition-opacity duration-500 ${selected === "a" ? "opacity-100" : "opacity-0"
                }`}
            ></div>
            <div
              className={`absolute top-16 left-0 w-80 h-80 bg-red-400 rounded-full blur-3xl -z-50 transition-opacity duration-500 ${selected === "a" ? "opacity-100" : "opacity-0"
                }`}
            ></div>

            <div
              className={`absolute bottom-12 left-0 w-60 h-60 bg-green-500 rounded-full blur-3xl -z-50 transition-opacity duration-500 ${selected === "d" ? "opacity-100" : "opacity-0"
                }`}
            ></div>
            <div
              className={`absolute top-12 right-0 w-80 h-80 bg-red-400 rounded-full blur-3xl -z-50 transition-opacity duration-500 ${selected === "d" ? "opacity-100" : "opacity-0"
                }`}
            ></div>
          </>
        )}
      </div>
    </section>
  );
};

export default EasyAs;
