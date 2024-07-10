import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import { useSelect } from 'downshift';
import Dropdown from '../../components/Dropdown';
import Hint from '../../components/Hint';
import useGraphStore from '../../state/graphStore';
import DeleteNode from '../../components/DeleteNode';

export type ImageInputLayerNodeData = {
  numChannels: number | null;
  batchSize: number | null;
  height: number | null;
  width: number | null;
  outputSize: string;
};

const ImageInputNode: React.FC<NodeProps<ImageInputLayerNodeData>> = (props) => {
  const { updateNodeData } = useGraphStore();
  const [numChannels, setNumChannels] = useState<number | null>(props.data.numChannels ?? null);
  const [batchSize, setBatchSize] = useState<number | null>(props.data.batchSize ?? null);
  const [height, setHeight] = useState<number | null>(props.data.height ?? null);
  const [width, setWidth] = useState<number | null>(props.data.width ?? null);
  const [outputSize, setOutputSize] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [batchSizeError, setBatchSizeError] = useState<string | null>(null);
  const [heightError, setHeightError] = useState<string | null>(null);
  const [widthError, setWidthError] = useState<string | null>(null);
  const [batchSizeInput, setBatchSizeInput] = useState<string>(batchSize !== null ? batchSize.toString() : '');
  const [heightInput, setHeightInput] = useState<string>(height !== null ? height.toString() : '');
  const [widthInput, setWidthInput] = useState<string>(width !== null ? width.toString() : '');

  const imageTypes = [
    { value: 'BW', label: 'Black and White', channels: 1 },
    { value: 'Color', label: 'Color', channels: 3 }
  ];

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    selectedItem
  } = useSelect({
    items: imageTypes,
    selectedItem: imageTypes.find(type => type.channels === numChannels),
    onSelectedItemChange: ({ selectedItem }) => {
      setNumChannels(selectedItem.channels);
      updateNodeData(props.id, { numChannels: selectedItem.channels });
    },
  });

  useEffect(() => {
    const output = `(${batchSize ?? 'N'}, ${numChannels ?? 'C'}, ${height ?? 'H'}, ${width ?? 'W'})`;
    setOutputSize(output); // Update output size to PyTorch format [N, C, H, W]
    updateNodeData(props.id, { outputSize: output });
  }, [numChannels, batchSize, height, width, updateNodeData, props.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = batchSizeInput ? Number(batchSizeInput) : null;
      if (value !== null && value < 1) {
        setBatchSizeError('Batch size must be a positive number.');
      } else {
        setBatchSizeError(null);
        props.data.batchSize = value;
        setBatchSize(value);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [batchSizeInput]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = heightInput ? Number(heightInput) : null;
      if (value !== null && value < 1) {
        setHeightError('Height must be a positive number.');
      } else {
        setHeightError(null);
        props.data.height = value;
        setHeight(value);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [heightInput]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = widthInput ? Number(widthInput) : null;
      if (value !== null && value < 1) {
        setWidthError('Width must be a positive number.');
      } else {
        setWidthError(null);
        props.data.width = value;
        setWidth(value);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [widthInput]);

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <div
        className="flex items-center p-1 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <img
          src="input/image.png"
          alt="Image Input"
          className="rounded-full h-10 w-10 mr-4"
        />
        <div className="flex-grow font-semibold text-gray-800 text-left">Image Input</div>
        <DeleteNode nodeId={props.id} />
        <div className="text-gray-500 ml-2">
          <Dropdown isCollapsed={isCollapsed} />
        </div>
      </div>
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="mb-4 relative">
            <label className="block text-gray-600 text-sm">Image Type:</label>
            <div {...getToggleButtonProps()} className="mt-1 w-full rounded border-gray-300 shadow-sm sm:text-sm cursor-pointer bg-white p-2 flex items-center justify-between">
              {selectedItem ? (
                <div className="flex items-center">
                  <span>{selectedItem.label}</span>
                </div>
              ) : (
                "Select an image type"
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
                imageTypes.map((item, index) => (
                  <li
                    key={`${item.value}`}
                    {...getItemProps({ item, index })}
                    className={`p-2 flex items-center cursor-pointer ${highlightedIndex === index ? "bg-gray-200" : ""}`}
                  >
                    {item.label}
                  </li>
                ))}
            </ul>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Batch Size:</label>
            <div className="flex items-center">
              <input
                type="number"
                className="mt-1 block w-full rounded shadow-sm sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-gray-300"
                value={batchSizeInput}
                onChange={(e) => setBatchSizeInput(e.target.value)}
                style={{ padding: '10px', height: '40px' }}
              />
              <Hint message="The number of samples processed together during training or evaluation." />
            </div>
            {batchSizeError && <p className="text-red-500 text-xs mt-1">{batchSizeError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Height:</label>
            <div className="flex items-center">
              <input
                type="number"
                className="mt-1 block w-full rounded shadow-sm sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-gray-300"
                value={heightInput}
                onChange={(e) => setHeightInput(e.target.value)}
                style={{ padding: '10px', height: '40px' }}
              />
              <Hint message="The height of the input images." />
            </div>
            {heightError && <p className="text-red-500 text-xs mt-1">{heightError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Width:</label>
            <div className="flex items-center">
              <input
                type="number"
                className="mt-1 block w-full rounded shadow-sm sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-gray-300"
                value={widthInput}
                onChange={(e) => setWidthInput(e.target.value)}
                style={{ padding: '10px', height: '40px' }}
              />
              <Hint message="The width of the input images." />
            </div>
            {widthError && <p className="text-red-500 text-xs mt-1">{widthError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Output Size:</label>
            <div className="flex items-center">
              <div className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2">
                {outputSize}
              </div>
              <Hint message="The shape of the tensor is (BatchSize x NumChannels x Height x Width)." />
            </div>
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default ImageInputNode;
