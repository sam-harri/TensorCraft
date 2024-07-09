import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const handleScroll = () => {
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      const offset = -100; // Adjust this value based on your header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = featuresSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative container mx-auto pl-4 py-20 flex flex-col md:flex-row items-center justify-between h-screen pt-16">
      <div className="w-full md:w-5/12 md:ml-auto min-w-[300px] space-y-4 z-10">
        <div
          className="animate__animated animate__fadeIn lg:ml-40 mt-24"
          style={{ animationDelay: "0.25s" }}
        >
          <div>
            <h1 className="text-6xl">
              Build Deep Learning Models with TensorCraft
            </h1>
          </div>
        </div>
        <div
          className="animate__animated animate__fadeIn pt-4 lg:ml-40"
          style={{ animationDelay: "0.5s" }}
        >
          <div>
            <p className="text-lg text-gray-600">
              Build neural networks using an intuitive node based Drag n' Drop
              UI, and compile it into your favorite framework.
            </p>
          </div>
        </div>
        <div
          className="animate__animated animate__fadeIn pt-8 lg:ml-40"
          style={{ animationDelay: "0.75s" }}
        >
          <div className="flex space-x-4">
            <a
              onClick={handleScroll}
              className="bg-gray-100 text-black border border-black px-4 py-2 rounded-lg flex items-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div>What else?</div>
              <img
                src="https://assets-global.website-files.com/661bf78957ad86c050eb493b/661bfaf9072a996e07cc844b_Arrow%20Black.svg"
                loading="lazy"
                alt="Arrow"
                className="ml-2"
              />
            </a>
            <Link
              to="/Craft"
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center hover:scale-105 transition-transform duration-300"
            >
              <div>Craft a Model</div>
              <img
                src="https://assets-global.website-files.com/661bf78957ad86c050eb493b/661bf78957ad86c050eb4989_Button%20Arrow.svg"
                loading="lazy"
                alt="Arrow"
                className="ml-2"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full md:w-7/12 md:mt-0 h-full pt-16 animate__animated animate__slideInUp">
        <div className="relative bg-gray-500 bg-opacity-10 border border-black border-opacity-5 p-4 rounded-lg">
          <img
            src="https://assets-global.website-files.com/661bf78957ad86c050eb493b/661bffc29d57182974e3c118_Dashboard%20White.jpg"
            loading="lazy"
            alt="Dashboard"
            className=""
            style={{ zIndex: 1 }}
            object-fit="cover"
          />

          <div className="absolute bottom-0 left-1/5 p-6 border border-gray-200 rounded-3xl bg-white bg-opacity-75 shadow-md translate-y-1/4 translate-x-full">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg"
              loading="lazy"
              alt="Logo 3"
              className="w-16 blur-lg absolute"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg"
              loading="lazy"
              alt="Logo 3"
              className="w-16 absolute"
            />
            <div className="w-16 h-16"></div>
          </div>

          <div className="absolute top-0 right-1/2 p-6 border border-gray-200 rounded-3xl bg-white bg-opacity-75 shadow-md translate-y-1/4 translate-x-full">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg"
              loading="lazy"
              alt="Logo 3"
              className="w-16 blur-md absolute"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg"
              loading="lazy"
              alt="Logo 3"
              className="w-16 absolute"
            />
            <div className="w-16 h-16"></div>
          </div>

          <div className="absolute top-0 left-0 p-6 border border-gray-200 rounded-3xl -translate-x-6 -translate-y-6 bg-white bg-opacity-75 shadow-md">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg"
              loading="lazy"
              alt="Logo 3"
              className="w-16 blur-lg absolute"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg"
              loading="lazy"
              alt="Logo 3"
              className="w-16 absolute"
            />
            <div className="w-16 h-16"></div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0  w-80 h-80 bg-violet-400 opacity-0 rounded-full blur-3xl animate__animated animate__fadeIn animate__delay-1s -z-50"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-300 opacity-0 rounded-full blur-3xl animate__animated animate__fadeIn animate__delay-1s -z-50"></div>
      </div>
    </div>
  );
};

export default Hero;
