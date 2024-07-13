import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import InputField from '../../components/InputField';
import useGraphStore from '../../state/graphStore';
import ShapeLabel from '../../components/ShapeLabel';
import NodeHeader from '../../components/NodeHeader';

export type TimeseriesInputLayerNodeData = {
  numFeatures: number | null;
  batchSize: number | null;
  sequenceLength: number | null;
  outputShape: string;
};

const validatePositiveNumber = (value: number) => value > 0;

const TimeseriesInputNode: React.FC<NodeProps<TimeseriesInputLayerNodeData>> = (props) => {
  const { updateNodeData } = useGraphStore();
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
    setOutputShape(output);
    updateNodeData(props.id, { outputShape: output });
  }, [numFeatures, batchSize, sequenceLength, updateNodeData, props.id]);

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <NodeHeader title="Timeseries Input" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} imageSource="input/timeseries.png" imageAlt="Timeseries Input" props={props} />
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <InputField
            label="Number of Features"
            valueInput={numFeaturesInput}
            setValueInput={setNumFeaturesInput}
            valueError={numFeaturesError}
            setValueError={setNumFeaturesError}
            setValue={setNumFeatures}
            errorMessage="Number of features must be a positive number."
            hintMessage="The number of features (columns) in the input data."
            validationFunction={validatePositiveNumber}
            props={props}
            dataKey="numFeatures"
          />
          <InputField
            label="Batch Size"
            valueInput={batchSizeInput}
            setValueInput={setBatchSizeInput}
            valueError={batchSizeError}
            setValueError={setBatchSizeError}
            setValue={setBatchSize}
            errorMessage="Batch size must be a positive number."
            hintMessage="The number of samples processed together during training or evaluation."
            validationFunction={validatePositiveNumber}
            props={props}
            dataKey="batchSize"
          />
          <InputField
            label="Sequence Length"
            valueInput={sequenceLengthInput}
            setValueInput={setSequenceLengthInput}
            valueError={sequenceLengthError}
            setValueError={setSequenceLengthError}
            setValue={setSequenceLength}
            errorMessage="Sequence length must be a positive number."
            hintMessage="The length of the sequence in the input data."
            validationFunction={validatePositiveNumber}
            props={props}
            dataKey="sequenceLength"
          />
          <ShapeLabel input={false} shape={outputShape} shapeHintMessage="The shape of the tensor is (BatchSize x NumFeatures x SequenceLength)." />
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default TimeseriesInputNode;
