import React, { useState } from "react";
import Dropdown from "./Dropdown";
import ModelCompilationContent from "./ModelCompilationContent";

const ModelCompilation: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="relative h-full text-gray-700">
      <div
        className={`absolute top-0 right-0 h-full transition-transform bg-white/30 backdrop-blur-md shadow-md ${
          isCollapsed ? "translate-x-[calc(100%)]" : "translate-x-0"
        } w-[75vw] z-[53] border-l border-t border-gray-300 rounded-l-3xl flex flex-col transition-transform duration-1000 overflow-hidden`}
      >
        <ModelCompilationContent />
      </div>
      <div
        className={`absolute transform mt-72 -translate-y-1/2 right-0 ${
          isCollapsed ? "translate-x-0" : "-translate-x-72-minus+1px"
        } transition-transform bg-white cursor-pointer p-1 h-20 flex items-center justify-center rounded-l-lg border-l-2 border-y border-gray-300 z-[54] duration-1000`}
        onClick={toggleSidebar}
      >
        <Dropdown isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

export default ModelCompilation;
