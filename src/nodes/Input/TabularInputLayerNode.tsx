import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import Dropdown from '../../components/Dropdown';
import Hint from '../../components/Hint';
import useStore from '../../state/store';

export type TabularInputLayerNodeData = {
  numFeatures: number | null;
  batchSize: number | null;
  outputSize: string;
};

const TabularInputLayerNode: React.FC<NodeProps<TabularInputLayerNodeData>> = (props) => {
  const { updateNodeData } = useStore();
  const [numFeatures, setNumFeatures] = useState<number | null>(props.data.numFeatures ?? null);
  const [batchSize, setBatchSize] = useState<number | null>(props.data.batchSize ?? null);
  const [outputSize, setOutputSize] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const output = `(${batchSize ?? 'N'}, ${numFeatures ?? 'C'})`;
    setOutputSize(output); // Update output size to PyTorch format [N, C]
    updateNodeData(props.id, { outputSize: output });
  }, [numFeatures, batchSize, updateNodeData, props.id]);

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
                className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={numFeatures !== null ? numFeatures : ''}
                onChange={(e) => {
                  props.data.numFeatures = e.target.value ? Number(e.target.value) : null;
                  setNumFeatures(e.target.value ? Number(e.target.value) : null)
                }}
                style={{ padding: '10px', height: '40px' }}
              />
              <Hint message='The number of features (columns) in the input data.' />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Batch Size:</label>
            <div className="flex items-center">
              <input
                type="number"
                className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={batchSize !== null ? batchSize : ''}
                onChange={(e) => {
                  props.data.batchSize = e.target.value ? Number(e.target.value) : null;
                  setBatchSize(e.target.value ? Number(e.target.value) : null)
                }}
                style={{ padding: '10px', height: '40px' }}
              />
              <Hint message='The number of samples processed together during training or evaluation.' />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Output Size:</label>
            <div className="flex items-center">
              <div className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2">
                {outputSize}
              </div>
              <Hint message='The shape of the tensor is (BatchSize x NumFeatures).' />
            </div>
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default TabularInputLayerNode;
