// src/components/TanhLayerNode.jsx
import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import Dropdown from '../../components/Dropdown';
import useGraphStore from '../../state/graphStore';
import Hint from '../../components/Hint';
import DeleteNode from '../../components/DeleteNode';

export type TanhLayerNodeData = {
  inputShape: string | null;
  outputShape: string | null;
};

const TanhNode: React.FC<NodeProps<TanhLayerNodeData>> = (props) => {
  const updateNodeData = useGraphStore((state) => state.updateNodeData);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const inputShape = props.data.inputShape;
    if (inputShape) {
      updateNodeData(props.id, { outputShape: inputShape });
    } else {
      updateNodeData(props.id, { outputShape: 'Not Connected' });
    }
  }, [props.data.inputShape, updateNodeData, props.id]);

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <div
        className="flex items-center p-1 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <img
          src="activationfunctions/tanh.png"
          alt="Tanh Activation"
          className="rounded-full h-10 w-10 mr-4"
        />
        <div className="flex-grow font-semibold text-gray-800 text-left">Tanh</div>
        <DeleteNode nodeId={props.id} />
        <div className="text-gray-500 ml-2">
          <Dropdown isCollapsed={isCollapsed} />
        </div>
      </div>
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Input Shape:</label>
            <div className="flex items-center">
              <div className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2">
                {props.data.inputShape ? props.data.inputShape : 'Not Connected'}
              </div>
              <Hint message="The shape of the input tensor." />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Output Shape:</label>
            <div className="flex items-center">
              <div className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2">
                {props.data.outputShape ? props.data.outputShape : 'Not Connected'}
              </div>
              <Hint message="The shape of the output tensor. Same as input shape." />
            </div>
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default TanhNode;
