import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import useGraphStore from '../../state/graphStore';
import InputField from '../../components/InputField';
import NodeHeader from '../../components/NodeHeader';
import ShapeLabel from '../../components/ShapeLabel';

export type Conv1DLayerNodeData = {
  numFilters: number | null;
  kernelSize: number | null;
  stride: number | null;
  padding: number | null;
  dilation: number | null;
  inputShape: string | null;
  outputShape: string | null;
};

const validatePositiveNumber = (value: number) => value > 0;
const validateNonNegativeNumber = (value: number) => value >= 0;

const Conv1DLayerNode: React.FC<NodeProps<Conv1DLayerNodeData>> = (props) => {
  const updateNodeData = useGraphStore((state) => state.updateNodeData);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [numFilters, setNumFilters] = useState<number | null>(props.data.numFilters ?? null);
  const [numFiltersInput, setNumFiltersInput] = useState<string>(numFilters !== null ? numFilters.toString() : '');
  const [numFiltersError, setNumFiltersError] = useState<string | null>(null);

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

  const calculateOutputLength = (inputLength: string) => {
    if (inputLength === "L)" || padding === null || dilation === null || kernelSize === null || stride === null) {
      return 'Lout';
    }
    return Math.floor(((parseInt(inputLength) + 2 * padding - dilation * (kernelSize - 1) - 1) / stride) + 1).toString();
  };

  useEffect(() => {
    const inputShape = props.data.inputShape;
    if (inputShape) {
      const inputShapeArr = inputShape.split(',').map((dim) => dim.trim());
      inputShapeArr[inputShapeArr.length - 1] = calculateOutputLength(inputShapeArr[inputShapeArr.length - 1]);
      inputShapeArr[1] = numFilters !== null ? numFilters.toString() : 'Cout';
      const newOutputShape = `${inputShapeArr.join(', ')})`;
      updateNodeData(props.id, { outputShape: newOutputShape });
    } else {
      updateNodeData(props.id, { outputShape: 'Not Connected' });
    }
  }, [props.data.inputShape, numFilters, kernelSize, stride, padding, dilation, updateNodeData]);

  return (
    <div className="bg-white shadow-md rounded border border-gray-300 w-72 relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <NodeHeader title="Conv1D Layer" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} imageSource="convolutions/conv1d.png" imageAlt="Conv1D" props={props} />
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <InputField
            label="Number of Filters"
            valueInput={numFiltersInput}
            setValueInput={setNumFiltersInput}
            valueError={numFiltersError}
            setValueError={setNumFiltersError}
            setValue={setNumFilters}
            errorMessage="Number of filters must be a positive number."
            hintMessage="The number of filters in the convolution layer."
            validationFunction={validatePositiveNumber}
            props={props}
            dataKey="numFilters"
            effectDependencies={[updateNodeData]}
          />
          <InputField
            label="Kernel Size"
            valueInput={kernelSizeInput}
            setValueInput={setKernelSizeInput}
            valueError={kernelSizeError}
            setValueError={setKernelSizeError}
            setValue={setKernelSize}
            errorMessage="Kernel size must be a positive number."
            hintMessage="The size of the kernel."
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
            hintMessage="The stride of the convolution."
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
            hintMessage="The amount of padding added to the input."
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
            hintMessage="The spacing between kernel elements."
            validationFunction={validatePositiveNumber}
            props={props}
            dataKey="dilation"
            effectDependencies={[updateNodeData]}
          />
          <ShapeLabel input={true} shape={props.data.inputShape || 'Not Connected'} shapeHintMessage="The length of the input sequence." />
          <ShapeLabel input={false} shape={props.data.outputShape || 'Not Connected'} shapeHintMessage="The shape of the output tensor is (Number of Filters, Output Length)." />
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default Conv1DLayerNode;
