// src/components/BatchNorm1dLayerNode.jsx
import React, { useState } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';

export type BatchNorm1dLayerNodeData = {
  inputSize: number;
  eps: number;
  momentum: number;
  affine: boolean;
  trackRunningStats: boolean;
};

const BatchNorm1dLayerNode: React.FC<NodeProps<BatchNorm1dLayerNodeData>> = (props) => {
  const [eps, setEps] = useState(props.data.eps);
  const [momentum, setMomentum] = useState(props.data.momentum);
  const [affine, setAffine] = useState(props.data.affine);
  const [trackRunningStats, setTrackRunningStats] = useState(props.data.trackRunningStats);
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <div
        className="flex items-center p-1 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <img
          src="normalization/batchnorm1d.png"
          alt="BatchNorm1D"
          className="rounded-full h-10 w-10 mr-4"
        />
        <div className="flex-grow font-semibold text-gray-800 text-left">BatchNorm1D</div>
        <div className="text-gray-500 ml-2">
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
          <div className="mb-2 flex items-center">
            <label className="block text-gray-600 text-sm w-2/3">Epsilon (eps):</label>
            <input
              type="number"
              step="0.00001"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm appearance-none"
              value={eps}
              onChange={(e) => setEps(Number(e.target.value))}
              style={{ padding: '10px', height: '40px' }}
            />
            <div className="relative ml-2 group">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle text-gray-300" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
              </svg>
              <div className="hidden group-hover:block absolute bottom-full mb-2 w-64 p-2 bg-white border border-gray-300 rounded shadow-lg text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                A value added to the denominator for numerical stability.
              </div>
            </div>
          </div>
          <div className="mb-2 flex items-center">
            <label className="block text-gray-600 text-sm w-2/3">Momentum:</label>
            <input
              type="number"
              step="0.01"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm appearance-none"
              value={momentum}
              onChange={(e) => setMomentum(Number(e.target.value))}
              style={{ padding: '10px', height: '40px' }}
            />
            <div className="relative ml-2 group">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle text-gray-300" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
              </svg>
              <div className="hidden group-hover:block absolute bottom-full mb-2 w-64 p-2 bg-white border border-gray-300 rounded shadow-lg text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                The value used for the running_mean and running_var computation. Can be set to None for cumulative moving average (i.e. simple average).
              </div>
            </div>
          </div>
          <div className="mb-2 flex items-center">
            <label className="block text-gray-600 text-sm w-2/3">Affine:</label>
            <label className="relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="affineCheck">
              <input
                type="checkbox"
                className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 before:w-8 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                id="affineCheck"
                checked={affine}
                onChange={(e) => setAffine(e.target.checked)}
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </label>
            <div className="relative ml-2 group">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle text-gray-300" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
              </svg>
              <div className="hidden group-hover:block absolute bottom-full mb-2 w-64 p-2 bg-white border border-gray-300 rounded shadow-lg text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                If True, this module has learnable affine parameters.
              </div>
            </div>
          </div>
          <div className="mb-2 flex items-center">
            <label className="block text-gray-600 text-sm w-2/3">Track Running Stats:</label>
            <label className="relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="trackRunningStatsCheck">
              <input
                type="checkbox"
                className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 before:w-8 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                id="trackRunningStatsCheck"
                checked={trackRunningStats}
                onChange={(e) => setTrackRunningStats(e.target.checked)}
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </label>
            <div className="relative ml-2 group">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle text-gray-300" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
              </svg>
              <div className="hidden group-hover:block absolute bottom-full mb-2 w-64 p-2 bg-white border border-gray-300 rounded shadow-lg text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                If True, this module tracks the running mean and variance.
              </div>
            </div>
          </div>
          <div>
            <label className="block text-gray-600 text-sm">Output Size:</label>
            <div className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2">
              {props.data.inputSize}
            </div>
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default BatchNorm1dLayerNode;
