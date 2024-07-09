import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-black text-center py-4 mt-12">
      <div className="flex justify-center">
        <hr className="border-b-gray-200 my-4 w-10/12" />
      </div>
      <div className="container mx-auto flex justify-center items-center mt-4">
        <img
          src="tensorcraft.png"
          alt="TensorCraft"
          className="w-8 h-auto"
        />
        <img
          src="tensorcrafttext.png"
          alt="TensorCraft"
          className="w-48 h-auto"
        />
      </div>
      <div className="container mx-auto mt-8">
        <p>&copy; 2024 TensorCraft. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
