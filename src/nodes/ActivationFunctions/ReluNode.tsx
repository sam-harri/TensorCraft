import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import Dropdown from '../../components/Dropdown';
import useStore from '../../state/store';
import Hint from '../../components/Hint';
import Checkbox from '../../components/Checkbox';

export type ReLULayerNodeData = {
  inputSize: string | null;
  outputSize: string | null;
  inplace: boolean;
};

const ReLULayerNode: React.FC<NodeProps<ReLULayerNodeData>> = (props) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const { inplace } = props.data;
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const inputSize = props.data.inputSize;
    if (inputSize) {
      updateNodeData(props.id, { outputSize: inputSize });
    } else {
      updateNodeData(props.id, { outputSize: 'Not Connected' });
    }
  }, [props.data.inputSize, updateNodeData, props.id]);

  const handleInplaceChange = (checked: boolean) => {
    updateNodeData(props.id, { inplace: checked });
  };

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <div
        className="flex items-center p-1 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <img
          src="activationfunctions/relu.png"
          alt="ReLU Activation"
          className="rounded-full h-10 w-10 mr-4"
        />
        <div className="flex-grow font-semibold text-gray-800 text-left">ReLU</div>
        <div className="text-gray-500 ml-2">
          <Dropdown isCollapsed={isCollapsed} />
        </div>
      </div>
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Input Size:</label>
            <div className="flex items-center">
              <div className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2">
                {props.data.inputSize ? props.data.inputSize : 'Not Connected'}
              </div>
              <Hint message="The shape of the input tensor." />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Output Size:</label>
            <div className="flex items-center">
              <div className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2">
                {props.data.outputSize ? props.data.outputSize : 'Not Connected'}
              </div>
              <Hint message="The shape of the output tensor. Same as input shape." />
            </div>
          </div>
          <div className="mb-2 flex items-center">
            <label className="block text-gray-600 text-sm mr-2">Inplace:</label>
            <Checkbox id="inplaceCheck" checked={inplace} onChangeFunction={handleInplaceChange} />
            <Hint message="Modifies the input data directly to save memory. Only use when the input data is no longer needed after." />
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default ReLULayerNode;
