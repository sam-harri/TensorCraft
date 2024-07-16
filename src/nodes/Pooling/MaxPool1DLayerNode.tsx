import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import useGraphStore from '../../state/graphStore';
import InputField from '../../components/InputField';
import NodeHeader from '../../components/NodeHeader';
import ShapeLabel from '../../components/ShapeLabel';
import Checkbox from '../../components/Checkbox';
import Hint from '../../components/Hint';

export type MaxPool1DLayerNodeData = {
  kernelSize: number | null;
  stride: number | null;
  padding: number | null;
  dilation: number | null;
  returnIndices: boolean;
  ceilMode: boolean;
  inputShape: string | null;
  outputShape: string | null;
  inputShapeOrder: string | null;
  outputShapeOrder: string | null;
};

const validatePositiveNumber = (value: number) => value > 0;
const validateNonNegativeNumber = (value: number) => value >= 0;
const isNumeric = (value: string) => !isNaN(Number(value));

const MaxPool1DLayerNode: React.FC<NodeProps<MaxPool1DLayerNodeData>> = (props) => {
  const updateNodeData = useGraphStore((state) => state.updateNodeData);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [kernelSize, setKernelSize] = useState<number | null>(props.data.kernelSize ?? null);
  const [kernelSizeInput, setKernelSizeInput] = useState<string>(kernelSize !== null ? kernelSize.toString() : '');
  const [kernelSizeError, setKernelSizeError] = useState<string | null>(null);

  const [stride, setStride] = useState<number | null>(props.data.stride ?? null);
  const [strideInput, setStrideInput] = useState<string>(stride !== null ? stride.toString() : '');
  const [strideError, setStrideError] = useState<string | null>(null);

  const [padding, setPadding] = useState<number | null>(props.data.padding ?? null);
  const [paddingInput, setPaddingInput] = useState<string>(padding !== null ? padding.toString() : '');
  const [paddingError, setPaddingError] = useState<string | null>(null);

  const [dilation, setDilation] = useState<number | null>(props.data.dilation ?? null);
  const [dilationInput, setDilationInput] = useState<string>(dilation !== null ? dilation.toString() : '');
  const [dilationError, setDilationError] = useState<string | null>(null);

  const { ceilMode } = props.data;
  // const { returnIndices, ceilMode } = props.data;

  // const handleReturnIndicesChange = (checked: boolean) => {
  //   updateNodeData(props.id, { returnIndices: checked });
  // };

  const handleCeilModeChange = (checked: boolean) => {
    updateNodeData(props.id, { ceilMode: checked });
  };

  const calculateOutputLength = (inputLength: string) => {
    const cleanedInputLength = inputLength.replace(/\s+/g, '');
    if (!isNumeric(cleanedInputLength) || kernelSize === null || stride === null || padding === null || dilation === null) {
      return "Lout";
    }
    return Math.floor(((parseInt(cleanedInputLength) + 2 * padding - dilation * (kernelSize - 1) - 1) / stride) + 1).toString();
  };

  useEffect(() => {
    const inputShape = props.data.inputShape;
    if (inputShape) {
      const inputShapeArr = inputShape.split(',').map((dim) => dim.trim());
      inputShapeArr[inputShapeArr.length - 1] = calculateOutputLength(inputShapeArr[inputShapeArr.length - 1]);
      const newOutputShape = `${inputShapeArr.join(', ')})`;
      updateNodeData(props.id, { outputShape: newOutputShape });
    } else {
      updateNodeData(props.id, { outputShape: 'Not Connected' });
    }
  }, [props.data.inputShape, kernelSize, stride, padding, dilation, updateNodeData]);

  useEffect(() => {
    updateNodeData(props.id, { outputShapeOrder: props.data.inputShapeOrder });
  }, [props.data.inputShapeOrder])

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <NodeHeader title="MaxPool1D Layer" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} imageSource="pooling/maxpool1d.png" imageAlt="MaxPool1D" props={props} />
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <InputField
            label="Kernel Size"
            valueInput={kernelSizeInput}
            setValueInput={setKernelSizeInput}
            valueError={kernelSizeError}
            setValueError={setKernelSizeError}
            setValue={setKernelSize}
            errorMessage="Kernel size must be a positive number."
            hintMessage="Size of the sliding window used for max pooling."
            validationFunction={validatePositiveNumber}
            props={props}
            dataKey="kernelSize"
            effectDependencies={[updateNodeData]}
          />
          <InputField
            label="Stride"
            valueInput={strideInput}
            setValueInput={setStrideInput}
            valueError={strideError}
            setValueError={setStrideError}
            setValue={setStride}
            errorMessage="Stride must be a positive number."
            hintMessage="Stride of the sliding window during max pooling."
            validationFunction={validatePositiveNumber}
            props={props}
            dataKey="stride"
            effectDependencies={[updateNodeData]}
          />
          <InputField
            label="Padding"
            valueInput={paddingInput}
            setValueInput={setPaddingInput}
            valueError={paddingError}
            setValueError={setPaddingError}
            setValue={setPadding}
            errorMessage="Padding cannot be less than 0."
            hintMessage="Padding added to both sides of the input."
            validationFunction={validateNonNegativeNumber}
            props={props}
            dataKey="padding"
            effectDependencies={[updateNodeData]}
          />
          <InputField
            label="Dilation"
            valueInput={dilationInput}
            setValueInput={setDilationInput}
            valueError={dilationError}
            setValueError={setDilationError}
            setValue={setDilation}
            errorMessage="Dilation must be a positive number."
            hintMessage="Spacing between elements within the sliding window."
            validationFunction={validatePositiveNumber}
            props={props}
            dataKey="dilation"
            effectDependencies={[updateNodeData]}
          />
          {/* <div className="mb-2 flex items-center">
            <label className="block text-gray-600 text-sm mr-2">Return Indices:</label>
            <Checkbox id="returnIndicesCheck" checked={returnIndices} onChangeFunction={handleReturnIndicesChange} />
            <Hint message="If True, the indices of the max values will be returned along with the max values. Useful for unpooling layers." />
          </div> */}
          <div className="mb-2 flex items-center">
            <label className="block text-gray-600 text-sm mr-2">Ceil Mode:</label>
            <Checkbox id="ceilModeCheck" checked={ceilMode} onChangeFunction={handleCeilModeChange} />
            <Hint message="If True, will use ceil instead of floor to compute the output shape, ensuring every element is covered by a sliding window." />
          </div>
          <ShapeLabel input={true} shape={props.data.inputShape || 'Not Connected'} shapeHintMessage="The shape of the input tensor is expected to be (Batch, Channels, Sequence Length)." />
          <ShapeLabel input={false} shape={props.data.outputShape || 'Not Connected'} shapeHintMessage="The shape of the output tensor is expected to be (Batch, Channels, Output Length)." />
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default MaxPool1DLayerNode;
