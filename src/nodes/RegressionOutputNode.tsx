// src/components/RegressionOutputNode.jsx
import React, { useState } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';

export type RegressionOutputNodeData = {
  numPredictedVariables: number;
  inputSize: number;
};

const RegressionOutputNode: React.FC<NodeProps<RegressionOutputNodeData>> = (props) => {
  const [numPredictedVariables, setNumPredictedVariables] = useState(props.data.numPredictedVariables);
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="font-semibold text-gray-800">Regression Output</div>
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
          <label className="block text-gray-600 text-sm">Number of Predicted Variables:</label>
          <input
            type="number"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm"
            value={numPredictedVariables}
            onChange={(e) => {
              const value = Number(e.target.value);
              setNumPredictedVariables(value);
              props.data.inputSize = value;
            }}
            style={{ padding: '10px', height: '40px' }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm">Input Size:</label>
          <div className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2">
            {numPredictedVariables}
          </div>
        </div>
      </div>)}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default RegressionOutputNode;
