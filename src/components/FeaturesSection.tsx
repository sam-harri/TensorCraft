import React, { useEffect, useRef } from 'react';

const FeaturesSection: React.FC = () => {
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
    <section ref={sectionRef} className="container mx-auto px-4 lg:w-2/3 md:mt-32 mt-96" id='features-section'>
      <div className={`text-center mb-12 ${isVisible ? 'animate__animated animate__slideInUp' : ''}`}>
        <h2 className="text-4xl font-semibold">Innovative Features for Seamless Neural Network Building</h2>
        <p className="text-gray-600 mt-4 z-0">
          Explore the power of our drag-and-drop neural network builder, meticulously crafted to elevate
          your machine learning experience. From automatic model compilation to comprehensive deployment solutions.
        </p>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isVisible ? 'animate__animated animate__slideInUp' : ''}`}>
        <div className="flex flex-col items-center relative">
          <div className="w-full h-48 backdrop-blur-md bg-gray-200 bg-opacity-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-gray-200">
            <img
              src="frameworks.png"
              alt="Feature 1"
              className={`rounded-lg transform transition-transform duration-1000 ease-out delay-500 ${isVisible ? 'scale-100' : 'scale-150'}`}
            />
          </div>
          <div className="absolute bottom-1/3 left-0  w-96 h-60 bg-pink-400 opacity-0 rounded-full blur-3xl animate__animated animate__fadeIn animate__delay-1s -z-50"></div>
          <h3 className="text-xl font-medium">Automatic Model Compilation</h3>
          <p className="text-gray-600 text-center mt-2">
            Automatically compiles the model as you go, debugging tensor shapes and building implementations in Keras, TensorFlow, and PyTorch.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-full h-48 bg-gray-200 bg-opacity-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-gray-200">
            <img
              src="diagram-builder.png"
              alt="Feature 2"
              className={`rounded-lg transform transition-transform duration-1000 ease-out delay-500 ${isVisible ? 'scale-100' : 'scale-150'}`}
            />
          </div>
          <h3 className="text-xl font-medium">Model Diagram Generation</h3>
          <p className="text-gray-600 text-center mt-2">
            Creates a diagram of your model in various styles, including MLP and Vision models, for better visualization and understanding.
          </p>
        </div>
        <div className="flex flex-col items-center relative">
          <div className="w-full h-48 bg-gray-200 bg-opacity-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-gray-200">
            <img
              src="ai-powered.png"
              alt="Feature 3"
              className={`rounded-lg transform transition-transform duration-1000 ease-out delay-500 ${isVisible ? 'scale-100' : 'scale-150'}`}
            />
          </div>
          <h3 className="text-xl font-medium">AI-Powered Model Builder</h3>
          <p className="text-gray-600 text-center mt-2">
            Explain your model in plain text or upload a research paper, and let the TensorCraft AI engine work its magic.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
