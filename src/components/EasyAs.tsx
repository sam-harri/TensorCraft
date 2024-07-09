import React, { useEffect, useRef, useState } from "react";

const EasyAs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState("dragndrop"); // nlb, research, dragndrop, diagram

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
      case "nlb":
        return "describing your model in plain text and letting us handle the rest.";
      case "research":
        return "uploading a research paper; We'll take it from there.";
      case "dragndrop":
        return "building your model with our intuitive drag-and-drop interface.";
      case "diagram":
        return "compiling your model into PyTorch, TensorFlow, or Keras and generating professional diagrams.";
      default:
        return "";
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`container mx-auto px-4 lg:w-2/3 mt-32 ${
        isVisible ? "animate__animated animate__slideInUp" : ""
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
            id="dragndrop"
            className="hidden"
            checked={selected === "dragndrop"}
            onChange={() => setSelected("dragndrop")}
          />
          <label
            htmlFor="dragndrop"
            className={`cursor-pointer py-2.5 px-4 rounded-full flex items-center justify-center w-full ${
              selected === "dragndrop"
                ? "bg-white text-black font-medium border border-gray-200"
                : "text-gray-400"
            }`}
          >
            Drag-and-Drop Builder
          </label>
        </li>
        <li className="flex-1 text-center flex">
          <input
            type="radio"
            name="features"
            id="research"
            className="hidden"
            checked={selected === "research"}
            onChange={() => setSelected("research")}
          />
          <label
            htmlFor="research"
            className={`cursor-pointer py-2.5 px-4 rounded-full flex items-center justify-center w-full ${
              selected === "research"
                ? "bg-white text-black font-medium border border-gray-200"
                : "text-gray-400"
            }`}
          >
            Research Paper to Code
          </label>
        </li>
        <li className="flex-1 text-center flex">
          <input
            type="radio"
            name="features"
            id="nlb"
            className="hidden"
            checked={selected === "nlb"}
            onChange={() => setSelected("nlb")}
          />
          <label
            htmlFor="nlb"
            className={`cursor-pointer py-2.5 px-4 rounded-full flex items-center justify-center w-full ${
              selected === "nlb"
                ? "bg-white text-black font-medium border border-gray-200"
                : "text-gray-400"
            }`}
          >
            Natural Language Model Builder
          </label>
        </li>
        <li className="flex-1 text-center flex">
          <input
            type="radio"
            name="features"
            id="diagram"
            className="hidden"
            checked={selected === "diagram"}
            onChange={() => setSelected("diagram")}
          />
          <label
            htmlFor="diagram"
            className={`cursor-pointer py-2.5 px-4 rounded-full flex items-center justify-center w-full ${
              selected === "diagram"
                ? "bg-white text-black font-medium border border-gray-200"
                : "text-gray-400"
            }`}
          >
            Model Compilation & Diagrams
          </label>
        </li>
      </ul>

      <div
        className={`w-full h-full pt-16 ${
          isVisible ? "animate__animated animate__slideInUp" : ""
        }`}
      >
        <div className="relative bg-opacity-10 border border-black border-opacity-5 p-4 rounded-lg bg-gray-500">
          <img
            src="https://assets-global.website-files.com/661bf78957ad86c050eb493b/661bffc29d57182974e3c118_Dashboard%20White.jpg"
            loading="lazy"
            alt="dragndrop"
            className=""
            style={{ zIndex: 1 }}
            object-fit="cover"
          />
        </div>
        {isVisible && (
          <>
            <div
              className={`absolute top-16 right-0 w-60 h-60 bg-green-500 rounded-full blur-3xl -z-50 transition-opacity duration-500 ${
                selected === "nlb" ? "opacity-100" : "opacity-0"
              }`}
            ></div>
            <div
              className={`absolute bottom-0 left-0 w-80 h-80 bg-red-400 rounded-full blur-3xl -z-50 transition-opacity duration-500 ${
                selected === "nlb" ? "opacity-100" : "opacity-0"
              }`}
            ></div>

            <div
              className={`absolute top-32 -left-6 w-60 h-60 bg-green-500 rounded-full blur-3xl -z-50 transition-opacity duration-500 ${
                selected === "research" ? "opacity-100" : "opacity-0"
              }`}
            ></div>
            <div
              className={`absolute bottom-0 right-0 w-80 h-80 bg-red-400 rounded-full blur-3xl -z-50 transition-opacity duration-500 ${
                selected === "research" ? "opacity-100" : "opacity-0"
              }`}
            ></div>

            <div
              className={`absolute bottom-32 right-0 w-60 h-60 bg-green-500 rounded-full blur-3xl -z-50 transition-opacity duration-500 ${
                selected === "dragndrop" ? "opacity-100" : "opacity-0"
              }`}
            ></div>
            <div
              className={`absolute top-16 left-0 w-80 h-80 bg-red-400 rounded-full blur-3xl -z-50 transition-opacity duration-500 ${
                selected === "dragndrop" ? "opacity-100" : "opacity-0"
              }`}
            ></div>

            <div
              className={`absolute bottom-12 left-0 w-60 h-60 bg-green-500 rounded-full blur-3xl -z-50 transition-opacity duration-500 ${
                selected === "diagram" ? "opacity-100" : "opacity-0"
              }`}
            ></div>
            <div
              className={`absolute top-12 right-0 w-80 h-80 bg-red-400 rounded-full blur-3xl -z-50 transition-opacity duration-500 ${
                selected === "diagram" ? "opacity-100" : "opacity-0"
              }`}
            ></div>
          </>
        )}
      </div>
    </section>
  );
};

export default EasyAs;
