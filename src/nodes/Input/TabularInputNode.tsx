import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import Dropdown from '../../components/Dropdown';
import Hint from '../../components/Hint';
import useStore from '../../state/store';
import DeleteNode from '../../components/DeleteNode';

export type TabularInputLayerNodeData = {
  numFeatures: number | null;
  batchSize: number | null;
  outputShape: string | null;
};

const TabularInputNode: React.FC<NodeProps<TabularInputLayerNodeData>> = (props) => {
  const { updateNodeData } = useStore();
  const [isCollapsed, setIsCollapsed] = useState(true);
  
  const [numFeatures, setNumFeatures] = useState<number | null>(props.data.numFeatures ?? null);
  const [numFeaturesInput, setNumFeaturesInput] = useState<string>(numFeatures !== null ? numFeatures.toString() : '');
  const [numFeaturesError, setNumFeaturesError] = useState<string | null>(null);

  const [batchSize, setBatchSize] = useState<number | null>(props.data.batchSize ?? null);
  const [batchSizeError, setBatchSizeError] = useState<string | null>(null);
  const [batchSizeInput, setBatchSizeInput] = useState<string>(batchSize !== null ? batchSize.toString() : '');
  
  const [outputShape, setOutputShape] = useState<string>("");

  useEffect(() => {
    const output = `(${batchSize ?? 'N'}, ${numFeatures ?? 'C'})`;
    setOutputShape(output); // Update output size to PyTorch format [N, C]
    updateNodeData(props.id, { outputShape: output });
  }, [numFeatures, batchSize, updateNodeData, props.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = numFeaturesInput ? Number(numFeaturesInput) : null;
      if (value !== null && value < 1) {
        setNumFeaturesError('Number of features must be a positive number.');
      } else {
        setNumFeaturesError(null);
        props.data.numFeatures = value;
        setNumFeatures(value);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [numFeaturesInput]);

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

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <div
        className="flex items-center p-1 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <img
          src="input/tabular.png"
          alt="Tabular Input"
          className="rounded-full h-10 w-10 mr-4"
        />
        <div className="flex-grow font-semibold text-gray-800 text-left">Tabular Input</div>
        <DeleteNode nodeId={props.id} />
        <div className="text-gray-500 ml-2">
          <Dropdown isCollapsed={isCollapsed} />
        </div>
      </div>
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Number of Features:</label>
            <div className="flex items-center">
              <input
                type="number"
                className="mt-1 block w-full rounded shadow-sm sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-gray-300"
                value={numFeaturesInput}
                onChange={(e) => setNumFeaturesInput(e.target.value)}
                style={{ padding: '10px', height: '40px' }}
              />
              <Hint message="The number of features (columns) in the input data." />
            </div>
            {numFeaturesError && <p className="text-red-500 text-xs mt-1">{numFeaturesError}</p>}
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
            <label className="block text-gray-600 text-sm">Output Shape:</label>
            <div className="flex items-center">
              <div className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2">
                {outputShape}
              </div>
              <Hint message="The shape of the tensor is (BatchSize x NumFeatures)." />
            </div>
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default TabularInputNode;
