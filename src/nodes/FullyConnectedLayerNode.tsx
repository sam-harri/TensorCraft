// src/components/FullyConnectedLayerNode.jsx
import React, { useState } from 'react';
import { useSelect } from 'downshift';
import { NodeProps, Handle, Position } from 'reactflow';

export type FullyConnectedNodeData = {
  numNeurons: number;
  activationFunction: string;
  inputSize: number;
  outputSize: number;
};

const FullyConnectedLayerNode: React.FC<NodeProps<FullyConnectedNodeData>> = (props) => {
  const [numNeurons, setNumNeurons] = useState(props.data.numNeurons);
  const [activationFunction, setActivationFunction] = useState(props.data.activationFunction);
//   const [outputSize, setOutputSize] = useState(props.data.outputSize);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const activationFunctions = [ //https://www.v7labs.com/blog/neural-networks-activation-functions
    { value: 'RELU', label: 'RELU', img: '/activationfunctions/relu.png' },
    { value: 'Tanh', label: 'Tanh', img: '/activationfunctions/tanh.png' },
    { value: 'Sigmoid', label: 'Sigmoid', img: '/activationfunctions/sigmoid.png' },
    // { value: 'Softmax', label: 'Softmax', img: 'https://via.placeholder.com/20' },
    { value: 'Linear', label: 'Linear', img: '/activationfunctions/linear.png' },
  ];

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useSelect({
    items: activationFunctions,
    selectedItem: activationFunctions.find(func => func.value === activationFunction),
    onSelectedItemChange: ({ selectedItem }) => setActivationFunction(selectedItem.value),
  });

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="font-semibold text-gray-800">Fully Connected Layer</div>
        <div className="text-gray-500">
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 10.707a1 1 0 01-1.414 0L10 7.414l-3.293 3.293a1 1 0 11-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Neurons:</label>
            <input
              type="number"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm"
              value={numNeurons}
              onChange={(e) => setNumNeurons(Number(e.target.value))}
              style={{ padding: '10px', height: '40px' }}
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-600 text-sm">Activation Function:</label>
            <div {...getToggleButtonProps()} className="mt-1 w-full rounded border-gray-300 shadow-sm sm:text-sm cursor-pointer bg-white p-2 flex items-center justify-between">
              {selectedItem ? (
                <div className="flex items-center">
                  <img src={selectedItem.img} alt={selectedItem.label} className="mr-2 h-6 w-6" />
                  <span>{selectedItem.label}</span>
                </div>
              ) : (
                "Select an activation function"
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <ul {...getMenuProps()} className={`${isOpen ? "block" : "hidden"} absolute bg-white border border-gray-300 mt-1 rounded shadow-lg z-10 w-full`}>
              {isOpen &&
                activationFunctions.map((item, index) => (
                  <li
                    key={`${item.value}`}
                    {...getItemProps({ item, index })}
                    className={`p-2 flex items-center cursor-pointer ${highlightedIndex === index ? "bg-gray-200" : ""}`}
                  >
                    <img src={item.img} alt={item.label} className="mr-2 h-6 w-6" />
                    {item.label}
                  </li>
                ))}
            </ul>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Input Size:</label>
            <div className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2">
              {props.data.inputSize}
            </div>
          </div>
          <div>
            <label className="block text-gray-600 text-sm">Output Size:</label>
            <div className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2">
              {numNeurons}
            </div>
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default FullyConnectedLayerNode;
