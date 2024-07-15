import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import InputField from '../../components/InputField';
import useGraphStore from '../../state/graphStore';
import ShapeLabel from '../../components/ShapeLabel';
import SelectImageType from '../../components/SelectImageType';
import NodeHeader from '../../components/NodeHeader';

export type ImageInputLayerNodeData = {
  numChannels: number | null;
  batchSize: number | null;
  height: number | null;
  width: number | null;
  outputShape: string;
};

const validatePositiveNumber = (value: number) => value > 0;

const ImageInputNode: React.FC<NodeProps<ImageInputLayerNodeData>> = (props) => {
  const { updateNodeData } = useGraphStore();
  const [numChannels, setNumChannels] = useState<number | null>(props.data.numChannels ?? null);
  const [outputShape, setOutputShape] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [batchSize, setBatchSize] = useState<number | null>(props.data.batchSize ?? null);
  const [batchSizeInput, setBatchSizeInput] = useState<string>(batchSize !== null ? batchSize.toString() : '');
  const [batchSizeError, setBatchSizeError] = useState<string | null>(null);

  const [height, setHeight] = useState<number | null>(props.data.height ?? null);
  const [heightInput, setHeightInput] = useState<string>(height !== null ? height.toString() : '');
  const [heightError, setHeightError] = useState<string | null>(null);

  const [width, setWidth] = useState<number | null>(props.data.width ?? null);
  const [widthInput, setWidthInput] = useState<string>(width !== null ? width.toString() : '');
  const [widthError, setWidthError] = useState<string | null>(null);

  useEffect(() => {
    const output = `(${batchSize ?? 'N'}, ${numChannels ?? 'C'}, ${height ?? 'H'}, ${width ?? 'W'})`;
    setOutputShape(output);
    updateNodeData(props.id, { outputShape: output });
  }, [numChannels, batchSize, height, width, updateNodeData, props.id]);

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <NodeHeader title="Image Input" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} imageSource="input/image.png" imageAlt="Image Input" props={props} />
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <SelectImageType numChannels={numChannels} setNumChannels={setNumChannels} props={props} />
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
            label="Height"
            valueInput={heightInput}
            setValueInput={setHeightInput}
            valueError={heightError}
            setValueError={setHeightError}
            setValue={setHeight}
            errorMessage="Height must be a positive number."
            hintMessage="The height of the input images."
            validationFunction={validatePositiveNumber}
            props={props}
            dataKey="height"
          />
          <InputField
            label="Width"
            valueInput={widthInput}
            setValueInput={setWidthInput}
            valueError={widthError}
            setValueError={setWidthError}
            setValue={setWidth}
            errorMessage="Width must be a positive number."
            hintMessage="The width of the input images."
            validationFunction={validatePositiveNumber}
            props={props}
            dataKey="width"
          />
          <ShapeLabel input={false} shape={outputShape} shapeHintMessage="The shape of the tensor is (BatchSize x NumChannels x Height x Width)." />
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default ImageInputNode;
