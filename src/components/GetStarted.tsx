import React, { useEffect, useRef } from "react";
import 'animate.css'; // Import animate.css library

const GetStarted: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

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

  return (
    <section ref={sectionRef} className="container mx-auto px-4 lg:w-2/3 mt-32">
      <div
        className={`relative border border-gray-200 rounded-3xl backdrop-blur-3xl overflow-hidden w-full h-[32rem] bg-gray-200 ${
          isVisible ? "animate__animated animate__slideInUp" : ""
        }`}
      >
        <div className="w-full md:w-5/12 space-y-4 z-10 px-4">
          <div className="lg:ml-12 mt-24">
            <div>
              <h1 className="text-5xl">
                Transform your Work Flow with TensorCraft
              </h1>
            </div>
          </div>
          <div className="lg:ml-12">
            <div>
              <p className="text-lg text-gray-600">
                Because no one likes debugging tensor shapes.
              </p>
            </div>
          </div>
          <div className="pt-2 lg:ml-12">
            <div className="flex space-x-4">
              <a
                href="/contact/contact-v1"
                className="bg-gray-100 text-black border border-black px-4 py-2 rounded-lg flex items-center hover:scale-105 transition-transform duration-300"
              >
                <div>Get Started</div>
                <img
                  src="https://assets-global.website-files.com/661bf78957ad86c050eb493b/661bfaf9072a996e07cc844b_Arrow%20Black.svg"
                  loading="lazy"
                  alt="Arrow"
                  className="ml-2"
                />
              </a>
              <a
                href="http://Google.com"
                target="_blank"
                className="bg-black text-white px-4 py-2 rounded-lg flex items-center hover:scale-105 transition-transform duration-300"
              >
                <div>Model Builder</div>
                <img
                  src="https://assets-global.website-files.com/661bf78957ad86c050eb493b/661bf78957ad86c050eb4989_Button%20Arrow.svg"
                  loading="lazy"
                  alt="Arrow"
                  className="ml-2"
                />
              </a>
            </div>
          </div>
        </div>

        <div
          className={`absolute -bottom-16 left-0 w-80 h-80 bg-blue-400 rounded-full blur-3xl -z-50 ${
            isVisible ? "animate__animated animate__fadeIn animate__slow" : ""
          }`}
        />
        <div
          className={`absolute top-16 right-16 w-40 h-40 bg-blue-400 rounded-full blur-3xl -z-50 ${
            isVisible ? "animate__animated animate__fadeIn animate__slow" : ""
          }`}
        />
      </div>
    </section>
  );
};

export default GetStarted;
