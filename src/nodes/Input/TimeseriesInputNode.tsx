import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import Dropdown from '../../components/Dropdown';
import Hint from '../../components/Hint';
import useStore from '../../state/store';
import DeleteNode from '../../components/DeleteNode';

export type TimeseriesInputLayerNodeData = {
  numFeatures: number | null;
  batchSize: number | null;
  sequenceLength: number | null;
  outputShape: string;
};

const TimeseriesInputNode: React.FC<NodeProps<TimeseriesInputLayerNodeData>> = (props) => {
  const { updateNodeData } = useStore();
  const [numFeatures, setNumFeatures] = useState<number | null>(props.data.numFeatures ?? null);
  const [batchSize, setBatchSize] = useState<number | null>(props.data.batchSize ?? null);
  const [sequenceLength, setSequenceLength] = useState<number | null>(props.data.sequenceLength ?? null);
  const [outputShape, setOutputShape] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [numFeaturesError, setNumFeaturesError] = useState<string | null>(null);
  const [batchSizeError, setBatchSizeError] = useState<string | null>(null);
  const [sequenceLengthError, setSequenceLengthError] = useState<string | null>(null);
  const [numFeaturesInput, setNumFeaturesInput] = useState<string>(numFeatures !== null ? numFeatures.toString() : '');
  const [batchSizeInput, setBatchSizeInput] = useState<string>(batchSize !== null ? batchSize.toString() : '');
  const [sequenceLengthInput, setSequenceLengthInput] = useState<string>(sequenceLength !== null ? sequenceLength.toString() : '');

  useEffect(() => {
    const output = `(${batchSize ?? 'N'}, ${numFeatures ?? 'C'}, ${sequenceLength ?? 'L'})`;
    setOutputShape(output); // Update output size to PyTorch format [N, C, L]
    updateNodeData(props.id, { outputShape: output });
  }, [numFeatures, batchSize, sequenceLength, updateNodeData, props.id]);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = sequenceLengthInput ? Number(sequenceLengthInput) : null;
      if (value !== null && value < 1) {
        setSequenceLengthError('Sequence length must be a positive number.');
      } else {
        setSequenceLengthError(null);
        props.data.sequenceLength = value;
        setSequenceLength(value);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [sequenceLengthInput]);

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <div
        className="flex items-center p-1 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <img
          src="input/timeseries.png"
          alt="Timeseries Input"
          className="rounded-full h-10 w-10 mr-4"
        />
        <div className="flex-grow font-semibold text-gray-800 text-left">Timeseries Input</div>
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
            <label className="block text-gray-600 text-sm">Sequence Length:</label>
            <div className="flex items-center">
              <input
                type="number"
                className="mt-1 block w-full rounded shadow-sm sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-gray-300"
                value={sequenceLengthInput}
                onChange={(e) => setSequenceLengthInput(e.target.value)}
                style={{ padding: '10px', height: '40px' }}
              />
              <Hint message="The length of the sequence in the input data." />
            </div>
            {sequenceLengthError && <p className="text-red-500 text-xs mt-1">{sequenceLengthError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Output Size:</label>
            <div className="flex items-center">
              <div className="mt-1 block w-full rounded border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2">
                {outputShape}
              </div>
              <Hint message="The shape of the tensor is (BatchSize x NumFeatures x SequenceLength)." />
            </div>
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default TimeseriesInputNode;
