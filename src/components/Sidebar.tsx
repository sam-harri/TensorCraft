import React, { useState } from 'react';
import Dropdown from './Dropdown';
import InputElement from './InputElement';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="relative h-full">
      <div
        className={`absolute top-0 left-0 h-full transition-width bg-white/30 backdrop-blur-md shadow-md ${isCollapsed ? 'w-0' : 'w-64'} z-20 border-r border-t border-gray-300 pt-4`}
      >
        {!isCollapsed && (
          <>
            {/* <div className="flex items-center ml-4">
              <img src="tensorcraft.png" alt="TensorCraft Logo" className="h-10 mb-0" />
              <div className="text-xl font-bold text-gray-800 ml-3">TensorCraft.io</div>
            </div> */}
            <div className="flex flex-col p-4">
              <div className="my-3">
                <div
                  className="flex items-center justify-between p-2 cursor-pointer rounded"
                  onClick={() => toggleDropdown('input')}
                >
                  <span>Input Layers</span>
                  <Dropdown isCollapsed={activeDropdown !== 'input'} />
                </div>
                {activeDropdown === 'input' && (
                  <div className="px-2 space-y-3">
                    <InputElement label="Tabular Input" img="input/tabular.png" nodeClass='tabular-input' />
                    <InputElement label="Time Series Input" img="input/timeseries.png" nodeClass='timeseries-input' />
                    <InputElement label="Image Input" img="input/image.png" nodeClass='image-input' />
                  </div>
                )}
              </div>
              <div className=' flex items-center justify-center'>
                <hr className="border-gray-200 w-4/5" />
              </div>
              <div className="my-3">
                <div
                  className="flex items-center justify-between p-2 cursor-pointer rounded"
                  onClick={() => toggleDropdown('activation')}
                >
                  <span>Activation Functions</span>
                  <Dropdown isCollapsed={activeDropdown !== 'activation'} />
                </div>
                {activeDropdown === 'activation' && (
                  <div className="px-2 space-y-3">
                    <InputElement label="Linear" img="activationfunctions/linear.png" nodeClass='linear' />
                    <InputElement label="ReLU" img="activationfunctions/relu.png" nodeClass='relu' />
                    <InputElement label="Sigmoid" img="activationfunctions/sigmoid.png" nodeClass='sigmoid' />
                    <InputElement label="Tanh" img="activationfunctions/tanh.png" nodeClass='tanh' />
                  </div>
                )}
              </div>
              <div className=' flex items-center justify-center'>
                <hr className="border-gray-200 w-4/5" />
              </div>
              <div className="my-3">
                <div
                  className="flex items-center justify-between p-2 cursor-pointer rounded"
                  onClick={() => toggleDropdown('conv')}
                >
                  <span>Conv Layers</span>
                  <Dropdown isCollapsed={activeDropdown !== 'conv'} />
                </div>
                {activeDropdown === 'conv' && (
                  <div className="px-2 space-y-3">
                    <InputElement label="Conv1D" img="convolutions/conv1d.png" nodeClass='conv1d' />
                    <InputElement label="Conv2D" img="convolutions/conv2d.png" nodeClass='conv2d' />
                    <InputElement label="Conv3D" img="convolutions/conv3d.png" nodeClass='conv3d' />
                  </div>
                )}
              </div>
              <div className=' flex items-center justify-center'>
                <hr className="border-gray-200 w-4/5" />
              </div>
              <div className="my-3">
                <div
                  className="flex items-center justify-between p-2 cursor-pointer rounded"
                  onClick={() => toggleDropdown('rnn')}
                >
                  <span>RNN Layers</span>
                  <Dropdown isCollapsed={activeDropdown !== 'rnn'} />
                </div>
                {activeDropdown === 'rnn' && (
                  <div className="px-2">
                    <div className="p-2 cursor-pointer rounded">LSTM</div>
                    <div className="p-2 cursor-pointer rounded">GRU</div>
                  </div>
                )}
              </div>
              <div className=' flex items-center justify-center'>
                <hr className="border-gray-200 w-4/5" />
              </div>
              <div className="my-3">
                <div
                  className="flex items-center justify-between p-2 cursor-pointer rounded"
                  onClick={() => toggleDropdown('tensor')}
                >
                  <span>Tensor Operators</span>
                  <Dropdown isCollapsed={activeDropdown !== 'tensor'} />
                </div>
                {activeDropdown === 'tensor' && (
                  <div className="px-2">
                    <div className="p-2 cursor-pointer rounded">Add</div>
                    <div className="p-2 cursor-pointer rounded">Multiply</div>
                  </div>
                )}
              </div>
              <div className=' flex items-center justify-center'>
                <hr className="border-gray-200 w-4/5" />
              </div>
            </div>
          </>
        )}
      </div>
      <div
        className={`absolute transform mt-72 -translate-y-1/2 left-0 ${isCollapsed ? 'translate-x-0' : 'translate-x-64-minus-1px'
          } transition-transform bg-white cursor-pointer p-1 h-20 flex items-center justify-center rounded-r-lg z-20 border-r-2 border-y border-gray-300`}
        onClick={toggleSidebar}
      >
        <Dropdown isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

export default Sidebar;
