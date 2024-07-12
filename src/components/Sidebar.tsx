import React, { useState } from "react";
import Dropdown from "./Dropdown";
import ToolBoxContent from "./ToolBoxContent";

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="relative h-full text-gray-700">
      <div
        className={`overflow-auto hide-scrollbar absolute top-0 left-0 h-full transition-width bg-white/30 backdrop-blur-md shadow-md ${
          isCollapsed ? "w-0" : "w-72"
        } z-20 border-r border-t border-gray-300 rounded-r-3xl`}
      >
        {!isCollapsed && <ToolBoxContent />}
      </div>
      <div
        className={`absolute transform mt-72 -translate-y-1/2 left-0 ${
          isCollapsed ? "translate-x-0" : "translate-x-72-minus-1px"
        } transition-transform bg-white cursor-pointer p-1 h-20 flex items-center justify-center rounded-r-lg z-20 border-r-2 border-y border-gray-300`}
        onClick={toggleSidebar}
      >
        <Dropdown isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

export default Sidebar;
