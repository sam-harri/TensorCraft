import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import InputField from '../../components/InputField';
import useGraphStore from '../../state/graphStore';
import ShapeLabel from '../../components/ShapeLabel';
import NodeHeader from '../../components/NodeHeader';

export type TabularInputLayerNodeData = {
  numFeatures: number | null;
  batchSize: number | null;
  outputShape: string | null;
};

const validatePositiveNumber = (value: number) => value > 0;

const TabularInputNode: React.FC<NodeProps<TabularInputLayerNodeData>> = (props) => {
  const { updateNodeData } = useGraphStore();
  const [isCollapsed, setIsCollapsed] = useState(true);
  
  const [numFeatures, setNumFeatures] = useState<number | null>(props.data.numFeatures ?? null);
  const [numFeaturesInput, setNumFeaturesInput] = useState<string>(numFeatures !== null ? numFeatures.toString() : '');
  const [numFeaturesError, setNumFeaturesError] = useState<string | null>(null);

  const [batchSize, setBatchSize] = useState<number | null>(props.data.batchSize ?? null);
  const [batchSizeInput, setBatchSizeInput] = useState<string>(batchSize !== null ? batchSize.toString() : '');
  const [batchSizeError, setBatchSizeError] = useState<string | null>(null);
  
  const [outputShape, setOutputShape] = useState<string>("");

  useEffect(() => {
    const output = `(${batchSize ?? 'N'}, ${numFeatures ?? 'C'})`;
    setOutputShape(output); // Update output size to PyTorch format [N, C]
    updateNodeData(props.id, { outputShape: output });
  }, [numFeatures, batchSize, updateNodeData, props.id]);

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <NodeHeader title="Tabular Input" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} imageSource="input/tabular.png" imageAlt="Tabular Input" props={props} />
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
          <ShapeLabel input={false} shape={outputShape} shapeHintMessage="The shape of the tensor is (BatchSize x NumFeatures)." />
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default TabularInputNode;
