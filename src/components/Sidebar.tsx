import React, { useState } from 'react';
import Dropdown from './Dropdown';
import InputElement from './InputElement';

const categories = [
  {
    title: "Input Layers",
    key: "input",
    items: [
      { label: "Tabular Input", img: "input/tabular.png", nodeClass: "tabular-input" },
      { label: "Time Series Input", img: "input/timeseries.png", nodeClass: "timeseries-input" },
      { label: "Image Input", img: "input/image.png", nodeClass: "image-input" },
    ]
  },
  {
    title: "Activation Functions",
    key: "activation",
    items: [
      { label: "Linear", img: "activationfunctions/linear.png", nodeClass: "linear" },
      { label: "ReLU", img: "activationfunctions/relu.png", nodeClass: "relu" },
      { label: "Sigmoid", img: "activationfunctions/sigmoid.png", nodeClass: "sigmoid" },
      { label: "Tanh", img: "activationfunctions/tanh.png", nodeClass: "tanh" },
    ]
  },
  {
    title: "Conv Layers",
    key: "conv",
    items: [
      { label: "Conv1D", img: "convolutions/conv1d.png", nodeClass: "conv1d" },
      { label: "Conv2D", img: "convolutions/conv2d.png", nodeClass: "conv2d" },
      { label: "Conv3D", img: "convolutions/conv3d.png", nodeClass: "conv3d" },
    ]
  },
  {
    title: "RNN Layers",
    key: "rnn",
    items: [
      { label: "LSTM", img: "rnn/lstm.png", nodeClass: "lstm" },
      { label: "GRU", img: "rnn/gru.png", nodeClass: "gru" },
    ]
  },
  {
    title: "Tensor Operators",
    key: "tensor",
    items: [
      { label: "Add", img: "tensoroperators/add.png", nodeClass: "add" },
      { label: "Multiply", img: "tensoroperators/multiply.png", nodeClass: "multiply" },
    ]
  },
  {
    title: "Pooling",
    key: "pool",
    items: [
      { label: "MaxPool", img: "pooling/maxpool.png", nodeClass: "maxpool" },
      { label: "AvgPool", img: "pooling/avgpool.png", nodeClass: "avgpool" },
    ]
  },
  {
    title: "Normalization",
    key: "norm",
    items: [
      { label: "LayerNorm", img: "normalization/layernorm.png", nodeClass: "layernorm" },
      { label: "BatchNorm", img: "normalization/batchnorm.png", nodeClass: "batchnorm" },
    ]
  }
];

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCategories = categories.flatMap(category =>
    category.items.filter(item => item.nodeClass.toLowerCase().includes(searchTerm))
  );

  return (
    <div className="relative h-full text-gray-700">
      <div
        className={`overflow-auto hide-scrollbar absolute top-0 left-0 h-full transition-width bg-white/30 backdrop-blur-md shadow-md ${isCollapsed ? 'w-0' : 'w-72'} z-20 border-r border-t border-gray-300 rounded-r-3xl`}
      >
        {!isCollapsed && (
          <>
            {/* search bar */}
            <div className="flex items-center px-4 my-6">
              <input
                type="search"
                className="flex-grow w-32 relative m-0 block rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-1 text-base font-normal text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary"
                placeholder="Search Toolbox"
                aria-label="Search"
                id="exampleFormControlInput2"
                aria-describedby="button-addon2"
                value={searchTerm}
                onChange={handleSearch}
              />
              <span
                className="flex items-center whitespace-nowrap px-3 py-[0.25rem] text-surface dark:border-neutral-400 dark:text-white [&>svg]:h-5 [&>svg]:w-5"
                id="button-addon2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </span>
            </div>

            <hr className="border-gray-200" />
            <div className="flex flex-col px-4">
              {searchTerm === "" ? (
                categories.map(category => (
                  <>
                    <div key={category.key} className="my-3">
                      <div
                        className="flex items-center justify-between p-2 cursor-pointer rounded"
                        onClick={() => toggleDropdown(category.key)}
                      >
                        <span>{category.title}</span>
                        <Dropdown isCollapsed={activeDropdown !== category.key} />
                      </div>
                      {activeDropdown === category.key && (
                        <div className="px-2 space-y-3">
                          {category.items.map(item => (
                            <>
                              <InputElement
                                key={item.nodeClass}
                                label={item.label}
                                img={item.img}
                                nodeClass={item.nodeClass}
                              />
                            </>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className='flex justify-center'>
                      <hr className=" border-gray-200 w-3/4 mr-4" />
                    </div>
                    </>
                ))
              ) : (
                <div className="px-2 space-y-3 mt-3">
                  {filteredCategories.map(item => (
                    <>
                    <InputElement
                      key={item.nodeClass}
                      label={item.label}
                      img={item.img}
                      nodeClass={item.nodeClass}
                    />
                                        <div className='flex justify-center'>
                      <hr className=" border-gray-200 w-3/4 mx-2" />
                    </div>
                    </>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div
        className={`absolute transform mt-72 -translate-y-1/2 left-0 ${isCollapsed ? 'translate-x-0' : 'translate-x-72-minus-1px'
          } transition-transform bg-white cursor-pointer p-1 h-20 flex items-center justify-center rounded-r-lg z-20 border-r-2 border-y border-gray-300`}
        onClick={toggleSidebar}
      >
        <Dropdown isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

export default Sidebar;
